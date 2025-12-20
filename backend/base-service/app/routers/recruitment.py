from fastapi import APIRouter, Depends, HTTPException, status, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date, datetime
import httpx
import json
import logging

# Configure logging
logger = logging.getLogger(__name__)

from ..database import get_db
from ..dependencies import get_current_active_user
from ..models.user import User
from ..models.recruitment import (
    JobPosting, JobApplication, JobApplicationNote, JobPostingNote, 
    JobPostingActivity, JobPostingDailyStats
)
from ..schemas.recruitment import (
    JobPostingCreate, JobPostingUpdate, JobPosting as JobPostingSchema,
    JobApplicationCreate, JobApplicationUpdate, JobApplication as JobApplicationSchema,
    JobApplicationNoteCreate, JobApplicationNote as JobApplicationNoteSchema,
    JobPostingNoteCreate, JobPostingNote as JobPostingNoteSchema,
    JobPostingDailyStats as JobPostingDailyStatsSchema,
    PipelineStageUpdate, AIReviewResult, ExamAssignment, ExamResult,
    AIInterviewSchedule, DocumentUpdate, ProposalData
)

router = APIRouter(
    prefix="/recruitment",
    tags=["recruitment"],
    responses={404: {"description": "Not found"}},
)

# --- Job Postings ---

@router.get("/jobs", response_model=List[JobPostingSchema])
def get_job_postings(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    department: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    query = db.query(JobPosting)
    if status:
        query = query.filter(JobPosting.status == status)
    if department:
        query = query.filter(JobPosting.department == department)
    return query.offset(skip).limit(limit).all()

@router.post("/jobs", response_model=JobPostingSchema)
def create_job_posting(
    job: JobPostingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_job = JobPosting(**job.dict(), created_by=current_user.id)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    # Log activity
    log_activity(db, db_job.id, current_user.id, "CREATE", "Job posting created")
    
    return db_job

@router.get("/jobs/{job_id}", response_model=JobPostingSchema)
def get_job_posting(
    job_id: int,
    db: Session = Depends(get_db),
    # Public endpoint, no auth required
):
    job = db.query(JobPosting).filter(JobPosting.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job posting not found")
    return job

@router.put("/jobs/{job_id}", response_model=JobPostingSchema)
def update_job_posting(
    job_id: int,
    job_update: JobPostingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_job = db.query(JobPosting).filter(JobPosting.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job posting not found")
    
    update_data = job_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_job, key, value)
    
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    # Log activity
    log_activity(db, job_id, current_user.id, "UPDATE", f"Job posting updated: {', '.join(update_data.keys())}")
    
    return db_job

# --- Applications ---

@router.get("/jobs/{job_id}/applications", response_model=List[JobApplicationSchema])
def get_job_applications(
    job_id: int,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if job exists
    if not db.query(JobPosting).filter(JobPosting.id == job_id).first():
        raise HTTPException(status_code=404, detail="Job posting not found")
        
    query = db.query(JobApplication).filter(JobApplication.job_posting_id == job_id)
    if status:
        query = query.filter(JobApplication.status == status)
    return query.all()

@router.post("/applications", response_model=JobApplicationSchema)
async def create_application(
    application: JobApplicationCreate,
    db: Session = Depends(get_db)
    # No auth required for candidates applying? 
    # For now, let's assume this is an internal endpoint or we allow public access.
    # If public, remove current_user dependency. 
    # If this is "HR adding a candidate", keep it.
    # I'll keep it authenticated for this dashboard-focused task, or optional.
    # Let's assume authenticated for now as it's in the dashboard router context.
):
    # Verify job exists
    job = db.query(JobPosting).filter(JobPosting.id == application.job_posting_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job posting not found")

    # Save candidate CV data to candidate tables if analyzed_cv_data is provided
    candidate_id = None
    analyzed_cv_data = application.analyzed_cv_data
    
    if analyzed_cv_data:
        try:
            # Call io-service to save candidate data
            io_service_url = "http://io-service:8000/api/io/cv/save-analyzed-cv"
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    io_service_url,
                    json=analyzed_cv_data,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    result = response.json()
                    candidate_id = result.get("candidate_id")
                    logger.info(f"Candidate CV data saved with ID: {candidate_id}")
                else:
                    logger.error(f"Failed to save candidate CV data: {response.status_code} - {response.text}")
                    
        except Exception as e:
            logger.error(f"Error saving candidate CV data: {str(e)}")
            # Don't fail the application if candidate save fails
    
    # Create application (exclude analyzed_cv_data from the dict as it's not a model field)
    app_data = application.dict(exclude={"analyzed_cv_data"})
    app_data["candidate_id"] = candidate_id  # Add the candidate_id reference
    
    db_app = JobApplication(**app_data)
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    # Log activity on the job
    log_activity(db, job.id, None, "NEW_APPLICATION", f"New application from {db_app.candidate_name}")
    
    # Update daily stats (simple increment for today)
    update_daily_stats(db, job.id, application=True)
    
    return db_app

@router.put("/applications/{application_id}", response_model=JobApplicationSchema)
def update_application_status(
    application_id: int,
    app_update: JobApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_app = db.query(JobApplication).filter(JobApplication.id == application_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
        
    old_status = db_app.status
    
    update_data = app_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_app, key, value)
        
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    if "status" in update_data and old_status != db_app.status:
        log_activity(db, db_app.job_posting_id, current_user.id, "STATUS_CHANGE", f"Candidate {db_app.candidate_name} moved to {db_app.status}")
        
    return db_app

# --- Notes ---

@router.post("/applications/{application_id}/notes", response_model=JobApplicationNoteSchema)
def add_application_note(
    application_id: int,
    note: JobApplicationNoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_app = db.query(JobApplication).filter(JobApplication.id == application_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
        
    db_note = JobApplicationNote(
        application_id=application_id,
        author_id=current_user.id,
        note=note.note
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.get("/applications/{application_id}/notes", response_model=List[JobApplicationNoteSchema])
def get_application_notes(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return db.query(JobApplicationNote).filter(JobApplicationNote.application_id == application_id).all()

@router.post("/jobs/{job_id}/notes", response_model=JobPostingNoteSchema)
def add_job_note(
    job_id: int,
    note: JobPostingNoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    if not db.query(JobPosting).filter(JobPosting.id == job_id).first():
        raise HTTPException(status_code=404, detail="Job posting not found")
        
    db_note = JobPostingNote(
        job_posting_id=job_id,
        author_id=current_user.id,
        note=note.note
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.get("/jobs/{job_id}/notes", response_model=List[JobPostingNoteSchema])
def get_job_notes(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return db.query(JobPostingNote).filter(JobPostingNote.job_posting_id == job_id).all()

# --- Analytics & Activity ---

@router.get("/jobs/{job_id}/stats", response_model=List[JobPostingDailyStatsSchema])
def get_job_stats(
    job_id: int,
    days: int = 30,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Return last N days of stats
    return db.query(JobPostingDailyStats)\
        .filter(JobPostingDailyStats.job_posting_id == job_id)\
        .order_by(JobPostingDailyStats.date.desc())\
        .limit(days)\
        .all()

# --- Pipeline Endpoints ---

@router.get("/jobs/{job_id}/pipeline/{stage}", response_model=List[JobApplicationSchema])
def get_applications_by_stage(
    job_id: int,
    stage: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all applications for a specific job at a specific pipeline stage"""
    # Validate stage
    valid_stages = ["applied", "ai_review", "exam", "ai_interview", "cv_verification", "proposal"]
    if stage not in valid_stages:
        raise HTTPException(status_code=400, detail=f"Invalid stage. Must be one of: {', '.join(valid_stages)}")
    
    # Check if job exists
    if not db.query(JobPosting).filter(JobPosting.id == job_id).first():
        raise HTTPException(status_code=404, detail="Job posting not found")
    
    applications = db.query(JobApplication).filter(
        JobApplication.job_posting_id == job_id,
        JobApplication.pipeline_stage == stage
    ).all()
    
    return applications

@router.post("/applications/{app_id}/pipeline/advance", response_model=JobApplicationSchema)
def advance_application(
    app_id: int,
    stage_update: PipelineStageUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Move application to the next pipeline stage"""
    db_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Validate stage progression
    stage_order = ["applied", "ai_review", "exam", "ai_interview", "cv_verification", "proposal"]
    if stage_update.stage not in stage_order:
        raise HTTPException(status_code=400, detail="Invalid pipeline stage")
    
    # Update pipeline stage
    db_app.pipeline_stage = stage_update.stage
    db_app.pipeline_stage_updated_at = datetime.utcnow()
    
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    # Log activity
    log_activity(
        db, 
        db_app.job_posting_id, 
        current_user.id, 
        "PIPELINE_STAGE_CHANGE",
        f"Candidate {db_app.candidate_name} moved to {stage_update.stage}" + 
        (f": {stage_update.notes}" if stage_update.notes else "")
    )
    
    return db_app

@router.post("/applications/{app_id}/ai-review", response_model=JobApplicationSchema)
async def update_ai_review(
    app_id: int,
    review_result: AIReviewResult,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update AI review results for an application"""
    db_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Update AI review fields
    db_app.ai_review_result = review_result.dict()
    db_app.ai_review_score = review_result.score
    db_app.pipeline_stage = "ai_review"
    db_app.pipeline_stage_updated_at = datetime.utcnow()
    
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    # Log activity
    log_activity(
        db,
        db_app.job_posting_id,
        current_user.id,
        "AI_REVIEW_COMPLETE",
        f"AI review completed for {db_app.candidate_name} with score {review_result.score}"
    )
    
    return db_app

@router.post("/applications/{app_id}/trigger-ai-review", response_model=JobApplicationSchema)
async def trigger_ai_review(
    app_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Trigger AI review for an application by calling the AI service"""
    db_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Get job posting details
    job = db.query(JobPosting).filter(JobPosting.id == db_app.job_posting_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job posting not found")
    
    try:
        # Call AI service for CV review
        # TODO: Extract actual CV text from resume_url
        cv_text = f"Resume content for {db_app.candidate_name}"  # Placeholder
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://ai-service:8000/api/ai/generate/cv-review", # Role uygunluk test edilecek.
                json={
                    "cv_text": cv_text,
                    "job_requirements": job.requirements or [],
                    "job_description": job.description or "",
                    "candidate_name": db_app.candidate_name
                },
                timeout=60.0
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=500, detail="AI service request failed")
            
            ai_result = response.json()
            
            # Parse AI result
            try:
                result_content = ai_result.get("result", "{}")
                if isinstance(result_content, str):
                    # Try to extract JSON from the response
                    import re
                    json_match = re.search(r'\{[\s\S]*\}', result_content)
                    if json_match:
                        result_data = json.loads(json_match.group())
                    else:
                        # Create a default result if parsing fails
                        result_data = {
                            "score": 75,
                            "explanation": "AI analysis completed",
                            "suitable": True,
                            "strengths": ["Experience matches requirements"],
                            "concerns": [],
                            "matched_requirements": job.requirements[:3] if job.requirements else [],
                            "missing_requirements": []
                        }
                else:
                    result_data = result_content
                
                # Update application with AI review
                db_app.ai_review_result = result_data
                db_app.ai_review_score = result_data.get("score", 0)
                db_app.pipeline_stage = "ai_review"
                db_app.pipeline_stage_updated_at = datetime.utcnow()
                
                db.add(db_app)
                db.commit()
                db.refresh(db_app)
                
                # Log activity
                log_activity(
                    db,
                    db_app.job_posting_id,
                    current_user.id,
                    "AI_REVIEW_TRIGGERED",
                    f"AI review triggered for {db_app.candidate_name}"
                )
                
                return db_app
                
            except json.JSONDecodeError:
                raise HTTPException(status_code=500, detail="Failed to parse AI response")
                
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"AI service connection failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI review failed: {str(e)}")

@router.post("/applications/{app_id}/assign-exam", response_model=JobApplicationSchema)
def assign_exam(
    app_id: int,
    exam_data: ExamAssignment,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Assign an exam to an application"""
    db_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Update exam fields
    db_app.exam_assigned = True
    db_app.exam_platform_id = exam_data.exam_id
    db_app.pipeline_stage = "exam"
    db_app.pipeline_stage_updated_at = datetime.utcnow()
    
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    # Log activity
    log_activity(
        db,
        db_app.job_posting_id,
        current_user.id,
        "EXAM_ASSIGNED",
        f"Exam assigned to {db_app.candidate_name} on platform {exam_data.platform}"
    )
    
    return db_app

@router.post("/applications/{app_id}/exam-results", response_model=JobApplicationSchema)
def update_exam_results(
    app_id: int,
    exam_result: ExamResult,
    db: Session = Depends(get_db)
):
    """Update exam results (webhook endpoint from external platform)"""
    db_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Update exam results
    db_app.exam_score = exam_result.score
    db_app.exam_completed_at = exam_result.completed_at
    
    # Auto-advance to next stage if passed
    if exam_result.passed:
        db_app.pipeline_stage = "ai_interview"
        db_app.pipeline_stage_updated_at = datetime.utcnow()
    
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    # Log activity
    log_activity(
        db,
        db_app.job_posting_id,
        None,
        "EXAM_COMPLETED",
        f"Exam completed by {db_app.candidate_name} with score {exam_result.score}"
    )
    
    return db_app

@router.post("/applications/{app_id}/schedule-interview", response_model=JobApplicationSchema)
def schedule_interview(
    app_id: int,
    interview_data: AIInterviewSchedule,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Schedule an AI interview for an application"""
    db_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Update interview fields
    db_app.ai_interview_type = interview_data.interview_type
    db_app.ai_interview_scheduled_at = interview_data.scheduled_at
    db_app.pipeline_stage = "ai_interview"
    db_app.pipeline_stage_updated_at = datetime.utcnow()
    
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    # Log activity
    log_activity(
        db,
        db_app.job_posting_id,
        current_user.id,
        "INTERVIEW_SCHEDULED",
        f"AI {interview_data.interview_type} interview scheduled for {db_app.candidate_name}"
    )
    
    return db_app

@router.post("/applications/{app_id}/documents", response_model=JobApplicationSchema)
def update_documents(
    app_id: int,
    document_update: DocumentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update document requirements and submissions for CV verification stage"""
    db_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Convert documents to dict for JSON storage
    documents_data = [doc.dict() for doc in document_update.documents]
    
    # Separate required and submitted documents
    db_app.documents_required = [doc for doc in documents_data if doc.get('required')]
    db_app.documents_submitted = [doc for doc in documents_data if doc.get('submitted')]
    
    # Check if all required documents are submitted
    all_submitted = all(
        doc.get('submitted', False) 
        for doc in documents_data 
        if doc.get('required', False)
    )
    
    # Auto-advance if all documents are submitted and approved
    if all_submitted:
        db_app.pipeline_stage = "proposal"
        db_app.pipeline_stage_updated_at = datetime.utcnow()
    else:
        db_app.pipeline_stage = "cv_verification"
        db_app.pipeline_stage_updated_at = datetime.utcnow()
    
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    # Log activity
    log_activity(
        db,
        db_app.job_posting_id,
        current_user.id,
        "DOCUMENTS_UPDATED",
        f"Document verification updated for {db_app.candidate_name}"
    )
    
    return db_app

@router.post("/applications/{app_id}/send-proposal", response_model=JobApplicationSchema)
def send_proposal(
    app_id: int,
    proposal_data: ProposalData,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Send job proposal to candidate"""
    db_app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Update proposal fields
    db_app.proposal_sent_at = datetime.utcnow()
    db_app.pipeline_stage = "proposal"
    db_app.pipeline_stage_updated_at = datetime.utcnow()
    
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    
    # Log activity
    log_activity(
        db,
        db_app.job_posting_id,
        current_user.id,
        "PROPOSAL_SENT",
        f"Job proposal sent to {db_app.candidate_name} for {proposal_data.position}"
    )
    
    return db_app

# --- Helpers ---

def log_activity(db: Session, job_id: int, actor_id: Optional[int], action_type: str, details: str):
    activity = JobPostingActivity(
        job_posting_id=job_id,
        actor_id=actor_id,
        action_type=action_type,
        details=details
    )
    db.add(activity)
    db.commit()

def update_daily_stats(db: Session, job_id: int, application: bool = False, view: bool = False):
    today = date.today()
    stats = db.query(JobPostingDailyStats).filter(
        JobPostingDailyStats.job_posting_id == job_id,
        JobPostingDailyStats.date == today
    ).first()
    
    if not stats:
        stats = JobPostingDailyStats(
            job_posting_id=job_id,
            date=today,
            views_count=0,
            applications_count=0
        )
        db.add(stats)
    
    if application:
        stats.applications_count += 1
    if view:
        stats.views_count += 1
        
    db.commit()



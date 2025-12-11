from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date

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
    JobPostingDailyStats as JobPostingDailyStatsSchema
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
def create_application(
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

    db_app = JobApplication(**application.dict())
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



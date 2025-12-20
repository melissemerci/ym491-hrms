from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime, date

# --- Job Posting Schemas ---

class JobPostingBase(BaseModel):
    title: str
    department: Optional[str] = None
    location: Optional[str] = None
    work_type: Optional[str] = None
    status: Optional[str] = "Draft"
    description: Optional[str] = None
    responsibilities: Optional[List[str]] = []
    requirements: Optional[List[str]] = []
    benefits: Optional[List[str]] = []
    salary_range_min: Optional[int] = None
    salary_range_max: Optional[int] = None
    salary_currency: Optional[str] = "USD"
    expiration_date: Optional[datetime] = None

class JobPostingCreate(JobPostingBase):
    pass

class JobPostingUpdate(JobPostingBase):
    title: Optional[str] = None

class JobPosting(JobPostingBase):
    id: int
    posting_date: Optional[datetime]
    created_by: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

# --- Job Application Schemas ---

class JobApplicationBase(BaseModel):
    candidate_name: str
    email: str
    phone: Optional[str] = None
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None
    portfolio_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    source: Optional[str] = None
    status: Optional[str] = "New"

class JobApplicationCreate(JobApplicationBase):
    job_posting_id: int
    analyzed_cv_data: Optional[Dict[str, Any]] = None  # Full CV data from n8n analysis

class JobApplicationUpdate(BaseModel):
    status: Optional[str] = None
    phone: Optional[str] = None
    # Add other fields as needed

class JobApplication(JobApplicationBase):
    id: int
    job_posting_id: int
    candidate_id: Optional[str] = None  # Reference to candidate in candidate tables
    applied_at: datetime
    updated_at: Optional[datetime]
    
    # Pipeline fields
    pipeline_stage: str = "applied"
    pipeline_stage_updated_at: Optional[datetime] = None
    ai_review_result: Optional[Dict[str, Any]] = None
    ai_review_score: Optional[int] = None
    exam_assigned: bool = False
    exam_platform_id: Optional[str] = None
    exam_completed_at: Optional[datetime] = None
    exam_score: Optional[int] = None
    ai_interview_scheduled_at: Optional[datetime] = None
    ai_interview_completed_at: Optional[datetime] = None
    ai_interview_type: Optional[str] = None
    documents_required: Optional[List[Dict[str, Any]]] = None
    documents_submitted: Optional[List[Dict[str, Any]]] = None
    proposal_sent_at: Optional[datetime] = None
    proposal_accepted: Optional[bool] = None

    class Config:
        from_attributes = True

# --- Notes Schemas ---

class JobApplicationNoteBase(BaseModel):
    note: str

class JobApplicationNoteCreate(JobApplicationNoteBase):
    application_id: int

class JobApplicationNote(JobApplicationNoteBase):
    id: int
    application_id: int
    author_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class JobPostingNoteBase(BaseModel):
    note: str

class JobPostingNoteCreate(JobPostingNoteBase):
    job_posting_id: int

class JobPostingNote(JobPostingNoteBase):
    id: int
    job_posting_id: int
    author_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Activity & Stats Schemas ---

class JobPostingActivity(BaseModel):
    id: int
    job_posting_id: int
    actor_id: Optional[int]
    action_type: str
    details: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class JobPostingDailyStats(BaseModel):
    id: int
    job_posting_id: int
    date: date
    views_count: int
    applications_count: int

    class Config:
        from_attributes = True

# --- Pipeline Schemas ---

class AIReviewResult(BaseModel):
    score: int  # 0-100
    explanation: str
    suitable: bool
    strengths: List[str] = []
    concerns: List[str] = []
    matched_requirements: List[str] = []
    missing_requirements: List[str] = []

class PipelineStageUpdate(BaseModel):
    stage: str  # applied, ai_review, exam, ai_interview, cv_verification, proposal
    notes: Optional[str] = None

class ExamAssignment(BaseModel):
    platform: str
    exam_id: str
    exam_url: Optional[str] = None
    due_date: Optional[datetime] = None
    instructions: Optional[str] = None

class ExamResult(BaseModel):
    score: int
    completed_at: datetime
    passed: bool
    details: Optional[Dict[str, Any]] = None

class AIInterviewSchedule(BaseModel):
    interview_type: str  # "video" or "voice"
    scheduled_at: datetime
    duration_minutes: Optional[int] = 30
    meeting_url: Optional[str] = None
    instructions: Optional[str] = None

class DocumentRequirement(BaseModel):
    document_type: str  # e.g., "id_card", "diploma", "certificate"
    title: str
    description: Optional[str] = None
    required: bool = True
    submitted: bool = False
    file_url: Optional[str] = None
    submitted_at: Optional[datetime] = None

class DocumentUpdate(BaseModel):
    documents: List[DocumentRequirement]

class ProposalData(BaseModel):
    position: str
    salary_offer: Optional[int] = None
    start_date: Optional[date] = None
    benefits: Optional[List[str]] = []
    additional_notes: Optional[str] = None



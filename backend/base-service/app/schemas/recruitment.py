from pydantic import BaseModel
from typing import Optional, List
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

class JobApplicationUpdate(BaseModel):
    status: Optional[str] = None
    phone: Optional[str] = None
    # Add other fields as needed

class JobApplication(JobApplicationBase):
    id: int
    job_posting_id: int
    applied_at: datetime
    updated_at: Optional[datetime]

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



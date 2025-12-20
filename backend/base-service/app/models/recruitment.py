from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Date, UniqueConstraint
from sqlalchemy.dialects.postgresql import ARRAY, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class JobPosting(Base):
    __tablename__ = "job_postings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    department = Column(String(100), index=True)
    location = Column(String(100))
    work_type = Column(String(50)) # Remote, Hybrid, Onsite
    status = Column(String(50), default="Draft", nullable=False, index=True) # Draft, Active, Closed, Paused
    description = Column(Text)
    responsibilities = Column(ARRAY(String))
    requirements = Column(ARRAY(String))
    benefits = Column(ARRAY(String))
    salary_range_min = Column(Integer)
    salary_range_max = Column(Integer)
    salary_currency = Column(String(10), default="USD")
    posting_date = Column(DateTime(timezone=True), server_default=func.now())
    expiration_date = Column(DateTime(timezone=True))
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    applications = relationship("JobApplication", back_populates="job_posting", cascade="all, delete-orphan")
    internal_notes = relationship("JobPostingNote", back_populates="job_posting", cascade="all, delete-orphan")
    activities = relationship("JobPostingActivity", back_populates="job_posting", cascade="all, delete-orphan")
    daily_stats = relationship("JobPostingDailyStats", back_populates="job_posting", cascade="all, delete-orphan")

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    job_posting_id = Column(Integer, ForeignKey("job_postings.id"), nullable=False, index=True)
    candidate_id = Column(String(50), index=True)  # Reference to candidate in candidate tables
    candidate_name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50))
    resume_url = Column(String(500))
    cover_letter = Column(Text)
    portfolio_url = Column(String(500))
    linkedin_url = Column(String(500))
    source = Column(String(100)) # LinkedIn, Indeed, etc.
    status = Column(String(50), default="New", nullable=False, index=True) # New, Shortlisted, Interview, Hired, Rejected
    applied_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Pipeline fields
    pipeline_stage = Column(String(50), default="applied", nullable=False, index=True) # applied, ai_review, exam, ai_interview, cv_verification, proposal
    pipeline_stage_updated_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # AI Review stage fields
    ai_review_result = Column(JSON)  # Stores AI matching analysis
    ai_review_score = Column(Integer)  # 0-100 score
    
    # Exam stage fields
    exam_assigned = Column(Boolean, default=False)
    exam_platform_id = Column(String(255))  # External exam system ID
    exam_completed_at = Column(DateTime(timezone=True))
    exam_score = Column(Integer)  # Exam score
    
    # AI Interview stage fields
    ai_interview_scheduled_at = Column(DateTime(timezone=True))
    ai_interview_completed_at = Column(DateTime(timezone=True))
    ai_interview_type = Column(String(20))  # "video" or "voice"
    
    # CV Verification stage fields
    documents_required = Column(JSON)  # List of required documents
    documents_submitted = Column(JSON)  # Submitted document URLs/info
    
    # Proposal stage fields
    proposal_sent_at = Column(DateTime(timezone=True))
    proposal_accepted = Column(Boolean)

    # Relationships
    job_posting = relationship("JobPosting", back_populates="applications")
    notes = relationship("JobApplicationNote", back_populates="application", cascade="all, delete-orphan")

class JobApplicationNote(Base):
    __tablename__ = "job_application_notes"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("job_applications.id"), nullable=False, index=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    note = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    application = relationship("JobApplication", back_populates="notes")

class JobPostingNote(Base):
    __tablename__ = "job_posting_notes"

    id = Column(Integer, primary_key=True, index=True)
    job_posting_id = Column(Integer, ForeignKey("job_postings.id"), nullable=False, index=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    note = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    job_posting = relationship("JobPosting", back_populates="internal_notes")

class JobPostingActivity(Base):
    __tablename__ = "job_posting_activities"

    id = Column(Integer, primary_key=True, index=True)
    job_posting_id = Column(Integer, ForeignKey("job_postings.id"), nullable=False, index=True)
    actor_id = Column(Integer, ForeignKey("users.id"))
    action_type = Column(String(100), nullable=False) # STATUS_CHANGE, UPDATE, NEW_APPLICATION
    details = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    job_posting = relationship("JobPosting", back_populates="activities")

class JobPostingDailyStats(Base):
    __tablename__ = "job_posting_daily_stats"

    id = Column(Integer, primary_key=True, index=True)
    job_posting_id = Column(Integer, ForeignKey("job_postings.id"), nullable=False, index=True)
    date = Column(Date, nullable=False)
    views_count = Column(Integer, default=0)
    applications_count = Column(Integer, default=0)

    __table_args__ = (UniqueConstraint('job_posting_id', 'date', name='uq_job_posting_date'),)

    # Relationships
    job_posting = relationship("JobPosting", back_populates="daily_stats")



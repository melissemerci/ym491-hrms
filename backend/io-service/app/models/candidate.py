from sqlalchemy import Column, Integer, String, Boolean, Date, Text, ForeignKey, DECIMAL, TIMESTAMP
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base


class Candidate(Base):
    __tablename__ = "candidates"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), unique=True, nullable=False, index=True)
    full_name = Column(String(200), nullable=False)
    email = Column(String(255), index=True)
    phone = Column(String(50))
    original_filename = Column(String(255))
    file_url = Column(String(500))
    source = Column(String(100), default='CV Upload - AI Parsed')
    completeness_score = Column(Integer, default=0)
    profile_status = Column(String(50), default='Complete')
    total_experience_years = Column(DECIMAL(4, 1), default=0)
    current_position = Column(String(200))
    current_company = Column(String(200))
    highest_degree = Column(String(100))
    field_of_study = Column(String(150))
    institution = Column(String(200))
    certifications_count = Column(Integer, default=0)
    projects_count = Column(Integer, default=0)
    volunteering_count = Column(Integer, default=0)
    timestamp = Column(TIMESTAMP(timezone=True), server_default=func.now())
    processed_date = Column(TIMESTAMP(timezone=True), server_default=func.now())
    last_updated = Column(TIMESTAMP(timezone=True), server_default=func.now())
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())


class CandidatePersonalInfo(Base):
    __tablename__ = "candidate_personal_info"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, unique=True)
    birth_date = Column(Date)
    gender = Column(String(20))
    nationality = Column(String(100))
    email = Column(String(255))
    phone = Column(String(50))
    website = Column(String(255))
    linkedin_url = Column(String(255))
    github_url = Column(String(255))
    professional_title = Column(String(150))
    professional_summary = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())


class CandidateAddress(Base):
    __tablename__ = "candidate_addresses"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    address_type = Column(String(50), default='primary')
    country = Column(String(100))
    city = Column(String(100))
    street = Column(Text)
    postal_code = Column(String(20))
    is_current = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())


class CandidateWorkExperience(Base):
    __tablename__ = "candidate_work_experience"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    job_title = Column(String(150), nullable=False)
    company = Column(String(200), nullable=False)
    employment_type = Column(String(50))
    country = Column(String(100))
    city = Column(String(100))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    is_current = Column(Boolean, default=False)
    description = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())
    
    responsibilities = relationship("CandidateWorkExperienceResponsibility", back_populates="work_experience", cascade="all, delete-orphan")
    achievements = relationship("CandidateWorkExperienceAchievement", back_populates="work_experience", cascade="all, delete-orphan")
    technologies = relationship("CandidateWorkExperienceTechnology", back_populates="work_experience", cascade="all, delete-orphan")


class CandidateWorkExperienceResponsibility(Base):
    __tablename__ = "candidate_work_experience_responsibilities"
    
    id = Column(Integer, primary_key=True, index=True)
    work_experience_id = Column(Integer, ForeignKey("candidate_work_experience.id", ondelete="CASCADE"), nullable=False, index=True)
    responsibility = Column(Text, nullable=False)
    display_order = Column(Integer, default=0)
    
    work_experience = relationship("CandidateWorkExperience", back_populates="responsibilities")


class CandidateWorkExperienceAchievement(Base):
    __tablename__ = "candidate_work_experience_achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    work_experience_id = Column(Integer, ForeignKey("candidate_work_experience.id", ondelete="CASCADE"), nullable=False, index=True)
    achievement = Column(Text, nullable=False)
    display_order = Column(Integer, default=0)
    
    work_experience = relationship("CandidateWorkExperience", back_populates="achievements")


class CandidateWorkExperienceTechnology(Base):
    __tablename__ = "candidate_work_experience_technologies"
    
    id = Column(Integer, primary_key=True, index=True)
    work_experience_id = Column(Integer, ForeignKey("candidate_work_experience.id", ondelete="CASCADE"), nullable=False, index=True)
    technology = Column(String(100), nullable=False)
    
    work_experience = relationship("CandidateWorkExperience", back_populates="technologies")


class CandidateEducation(Base):
    __tablename__ = "candidate_education"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    institution = Column(String(200), nullable=False)
    degree = Column(String(150))
    field_of_study = Column(String(150))
    gpa = Column(String(20))
    start_date = Column(Date)
    end_date = Column(Date)
    is_current = Column(Boolean, default=False)
    thesis = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())
    
    courses = relationship("CandidateEducationCourse", back_populates="education", cascade="all, delete-orphan")


class CandidateEducationCourse(Base):
    __tablename__ = "candidate_education_courses"
    
    id = Column(Integer, primary_key=True, index=True)
    education_id = Column(Integer, ForeignKey("candidate_education.id", ondelete="CASCADE"), nullable=False, index=True)
    course_name = Column(String(200), nullable=False)
    
    education = relationship("CandidateEducation", back_populates="courses")


class CandidateTechnicalSkill(Base):
    __tablename__ = "candidate_technical_skills"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    skill_category_id = Column(Integer)
    skill_name = Column(String(150), nullable=False)
    proficiency_level = Column(String(50))
    years_of_experience = Column(DECIMAL(4, 1))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())


class CandidateSoftSkill(Base):
    __tablename__ = "candidate_soft_skills"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    skill_name = Column(String(100), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


class CandidateLanguage(Base):
    __tablename__ = "candidate_languages"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    language = Column(String(100), nullable=False)
    proficiency = Column(String(50))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())


class CandidateCertification(Base):
    __tablename__ = "candidate_certifications"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    certification_name = Column(String(200), nullable=False)
    issuing_organization = Column(String(200))
    issue_date = Column(Date)
    expiration_date = Column(Date)
    credential_id = Column(String(150))
    credential_url = Column(String(255))
    does_not_expire = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())


class CandidateProject(Base):
    __tablename__ = "candidate_projects"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    project_name = Column(String(200), nullable=False)
    description = Column(Text)
    role = Column(String(150))
    start_date = Column(Date)
    end_date = Column(Date)
    is_current = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())
    
    technologies = relationship("CandidateProjectTechnology", back_populates="project", cascade="all, delete-orphan")
    achievements = relationship("CandidateProjectAchievement", back_populates="project", cascade="all, delete-orphan")
    links = relationship("CandidateProjectLink", back_populates="project", cascade="all, delete-orphan")


class CandidateProjectTechnology(Base):
    __tablename__ = "candidate_project_technologies"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("candidate_projects.id", ondelete="CASCADE"), nullable=False, index=True)
    technology = Column(String(100), nullable=False)
    
    project = relationship("CandidateProject", back_populates="technologies")


class CandidateProjectAchievement(Base):
    __tablename__ = "candidate_project_achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("candidate_projects.id", ondelete="CASCADE"), nullable=False, index=True)
    achievement = Column(Text, nullable=False)
    
    project = relationship("CandidateProject", back_populates="achievements")


class CandidateProjectLink(Base):
    __tablename__ = "candidate_project_links"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("candidate_projects.id", ondelete="CASCADE"), nullable=False, index=True)
    url = Column(String(255), nullable=False)
    link_type = Column(String(50))
    
    project = relationship("CandidateProject", back_populates="links")


class CandidatePublication(Base):
    __tablename__ = "candidate_publications"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(300), nullable=False)
    publication_type = Column(String(100))
    publisher = Column(String(200))
    publication_date = Column(Date)
    url = Column(String(255))
    description = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())


class CandidateAward(Base):
    __tablename__ = "candidate_awards"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    award_name = Column(String(200), nullable=False)
    issuer = Column(String(200))
    award_date = Column(Date)
    description = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())


class CandidateVolunteering(Base):
    __tablename__ = "candidate_volunteering"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(String(150), nullable=False)
    organization = Column(String(200), nullable=False)
    start_date = Column(Date)
    end_date = Column(Date)
    is_current = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())
    
    responsibilities = relationship("CandidateVolunteeringResponsibility", back_populates="volunteering", cascade="all, delete-orphan")


class CandidateVolunteeringResponsibility(Base):
    __tablename__ = "candidate_volunteering_responsibilities"
    
    id = Column(Integer, primary_key=True, index=True)
    volunteering_id = Column(Integer, ForeignKey("candidate_volunteering.id", ondelete="CASCADE"), nullable=False, index=True)
    responsibility = Column(Text, nullable=False)
    
    volunteering = relationship("CandidateVolunteering", back_populates="responsibilities")


class CandidateAdditionalInfo(Base):
    __tablename__ = "candidate_additional_info"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    driving_license = Column(String(50))
    military_status = Column(String(100))
    availability = Column(String(100))
    willing_to_relocate = Column(Boolean, default=False)
    willing_to_travel = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=func.now())


class CandidateHobby(Base):
    __tablename__ = "candidate_hobbies"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, index=True)
    hobby = Column(String(150), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


class CandidateRawData(Base):
    __tablename__ = "candidate_raw_data"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(String(50), ForeignKey("candidates.candidate_id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    raw_structured_data = Column(JSONB)
    n8n_response = Column(JSONB)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


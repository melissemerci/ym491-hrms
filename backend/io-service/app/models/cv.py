from sqlalchemy import Column, Integer, String, Boolean, Date, Text, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from ..database import Base


class EmployeePersonalInfo(Base):
    __tablename__ = "employee_personal_info"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, unique=True, nullable=False)
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


class EmployeeAddress(Base):
    __tablename__ = "employee_addresses"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    address_type = Column(String(50), default='primary')
    country = Column(String(100))
    city = Column(String(100))
    street = Column(Text)
    postal_code = Column(String(20))
    is_current = Column(Boolean, default=True)


class EmployeeWorkExperience(Base):
    __tablename__ = "employee_work_experience"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    job_title = Column(String(150), nullable=False)
    company = Column(String(200), nullable=False)
    employment_type = Column(String(50))
    country = Column(String(100))
    city = Column(String(100))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    is_current = Column(Boolean, default=False)
    description = Column(Text)

    # Relationships
    responsibilities = relationship("WorkExperienceResponsibility", back_populates="work_experience", cascade="all, delete-orphan")
    achievements = relationship("WorkExperienceAchievement", back_populates="work_experience", cascade="all, delete-orphan")
    technologies = relationship("WorkExperienceTechnology", back_populates="work_experience", cascade="all, delete-orphan")


class WorkExperienceResponsibility(Base):
    __tablename__ = "work_experience_responsibilities"
    id = Column(Integer, primary_key=True, index=True)
    work_experience_id = Column(Integer, ForeignKey("employee_work_experience.id"), nullable=False)
    responsibility = Column(Text, nullable=False)

    work_experience = relationship("EmployeeWorkExperience", back_populates="responsibilities")


class WorkExperienceAchievement(Base):
    __tablename__ = "work_experience_achievements"
    id = Column(Integer, primary_key=True, index=True)
    work_experience_id = Column(Integer, ForeignKey("employee_work_experience.id"), nullable=False)
    achievement = Column(Text, nullable=False)

    work_experience = relationship("EmployeeWorkExperience", back_populates="achievements")


class WorkExperienceTechnology(Base):
    __tablename__ = "work_experience_technologies"
    id = Column(Integer, primary_key=True, index=True)
    work_experience_id = Column(Integer, ForeignKey("employee_work_experience.id"), nullable=False)
    technology = Column(String(100), nullable=False)

    work_experience = relationship("EmployeeWorkExperience", back_populates="technologies")


class EmployeeEducation(Base):
    __tablename__ = "employee_education"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    institution = Column(String(200), nullable=False)
    degree = Column(String(150))
    field_of_study = Column(String(150))
    gpa = Column(String(20))
    start_date = Column(Date)
    end_date = Column(Date)
    is_current = Column(Boolean, default=False)
    thesis = Column(Text)

    # Relationships
    courses = relationship("EducationCourse", back_populates="education", cascade="all, delete-orphan")


class EducationCourse(Base):
    __tablename__ = "education_courses"
    id = Column(Integer, primary_key=True, index=True)
    education_id = Column(Integer, ForeignKey("employee_education.id"), nullable=False)
    course_name = Column(String(200), nullable=False)

    education = relationship("EmployeeEducation", back_populates="courses")


class SkillCategory(Base):
    __tablename__ = "skill_categories"
    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String(100), nullable=False, unique=True)
    description = Column(Text)

    # Relationships
    skills = relationship("EmployeeTechnicalSkill", back_populates="category")


class EmployeeTechnicalSkill(Base):
    __tablename__ = "employee_technical_skills"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    skill_category_id = Column(Integer, ForeignKey("skill_categories.id"), nullable=True)
    skill_name = Column(String(150), nullable=False)
    proficiency_level = Column(String(50))
    years_of_experience = Column(DECIMAL(4, 1))

    category = relationship("SkillCategory", back_populates="skills")


class EmployeeSoftSkill(Base):
    __tablename__ = "employee_soft_skills"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    skill_name = Column(String(100), nullable=False)


class EmployeeLanguage(Base):
    __tablename__ = "employee_languages"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    language = Column(String(100), nullable=False)
    proficiency = Column(String(50))


class EmployeeCertification(Base):
    __tablename__ = "employee_certifications"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    certification_name = Column(String(200), nullable=False)
    issuing_organization = Column(String(200))
    issue_date = Column(Date)
    expiration_date = Column(Date)
    credential_id = Column(String(150))
    credential_url = Column(String(255))
    does_not_expire = Column(Boolean, default=False)


class EmployeeProject(Base):
    __tablename__ = "employee_projects"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    project_name = Column(String(200), nullable=False)
    description = Column(Text)
    role = Column(String(150))
    start_date = Column(Date)
    end_date = Column(Date)
    is_current = Column(Boolean, default=False)

    # Relationships
    technologies = relationship("ProjectTechnology", back_populates="project", cascade="all, delete-orphan")
    achievements = relationship("ProjectAchievement", back_populates="project", cascade="all, delete-orphan")
    links = relationship("ProjectLink", back_populates="project", cascade="all, delete-orphan")


class ProjectTechnology(Base):
    __tablename__ = "project_technologies"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("employee_projects.id"), nullable=False)
    technology = Column(String(100), nullable=False)

    project = relationship("EmployeeProject", back_populates="technologies")


class ProjectAchievement(Base):
    __tablename__ = "project_achievements"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("employee_projects.id"), nullable=False)
    achievement = Column(Text, nullable=False)

    project = relationship("EmployeeProject", back_populates="achievements")


class ProjectLink(Base):
    __tablename__ = "project_links"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("employee_projects.id"), nullable=False)
    url = Column(String(255), nullable=False)
    link_type = Column(String(50))

    project = relationship("EmployeeProject", back_populates="links")


class EmployeePublication(Base):
    __tablename__ = "employee_publications"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    title = Column(String(300), nullable=False)
    publication_type = Column(String(100))
    publisher = Column(String(200))
    publication_date = Column(Date)
    url = Column(String(255))
    description = Column(Text)


class EmployeeAward(Base):
    __tablename__ = "employee_awards"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    award_name = Column(String(200), nullable=False)
    issuer = Column(String(200))
    award_date = Column(Date)
    description = Column(Text)


class EmployeeVolunteering(Base):
    __tablename__ = "employee_volunteering"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    role = Column(String(150), nullable=False)
    organization = Column(String(200), nullable=False)
    start_date = Column(Date)
    end_date = Column(Date)
    is_current = Column(Boolean, default=False)

    # Relationships - NOT wrapped in Column()
    responsibilities = relationship("VolunteeringResponsibility", back_populates="volunteering", cascade="all, delete-orphan")


class VolunteeringResponsibility(Base):
    __tablename__ = "volunteering_responsibilities"
    id = Column(Integer, primary_key=True, index=True)
    volunteering_id = Column(Integer, ForeignKey("employee_volunteering.id"), nullable=False)
    responsibility = Column(Text, nullable=False)

    volunteering = relationship("EmployeeVolunteering", back_populates="responsibilities")


class EmployeeAdditionalInfo(Base):
    __tablename__ = "employee_additional_info"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, unique=True, nullable=False)
    driving_license = Column(String(50))
    military_status = Column(String(100))
    availability = Column(String(100))
    willing_to_relocate = Column(Boolean, default=False)
    willing_to_travel = Column(Boolean, default=False)


class EmployeeHobby(Base):
    __tablename__ = "employee_hobbies"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, nullable=False)
    hobby = Column(String(150), nullable=False)

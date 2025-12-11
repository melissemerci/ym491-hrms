from typing import List, Optional
from pydantic import BaseModel
from datetime import date

class PersonalInfoBase(BaseModel):
    birth_date: Optional[date] = None
    gender: Optional[str] = None
    nationality: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    professional_title: Optional[str] = None
    professional_summary: Optional[str] = None

class PersonalInfo(PersonalInfoBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class AddressBase(BaseModel):
    address_type: Optional[str] = 'primary'
    country: Optional[str] = None
    city: Optional[str] = None
    street: Optional[str] = None
    postal_code: Optional[str] = None
    is_current: Optional[bool] = True

class Address(AddressBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class WorkExperienceBase(BaseModel):
    job_title: str
    company: str
    employment_type: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    start_date: date
    end_date: Optional[date] = None
    is_current: Optional[bool] = False
    description: Optional[str] = None

class WorkExperience(WorkExperienceBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class EducationBase(BaseModel):
    institution: str
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    gpa: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_current: Optional[bool] = False
    thesis: Optional[str] = None

class Education(EducationBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class TechnicalSkillBase(BaseModel):
    skill_name: str
    proficiency_level: Optional[str] = None
    years_of_experience: Optional[float] = None

class TechnicalSkill(TechnicalSkillBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class SoftSkillBase(BaseModel):
    skill_name: str

class SoftSkill(SoftSkillBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class LanguageBase(BaseModel):
    language: str
    proficiency: Optional[str] = None

class Language(LanguageBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class CertificationBase(BaseModel):
    certification_name: str
    issuing_organization: Optional[str] = None
    issue_date: Optional[date] = None
    expiration_date: Optional[date] = None
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    does_not_expire: Optional[bool] = False

class Certification(CertificationBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    project_name: str
    description: Optional[str] = None
    role: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_current: Optional[bool] = False

class Project(ProjectBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class PublicationBase(BaseModel):
    title: str
    publisher: Optional[str] = None
    publication_date: Optional[date] = None
    url: Optional[str] = None
    description: Optional[str] = None
    
class Publication(PublicationBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class AwardBase(BaseModel):
    award_name: str
    issuer: Optional[str] = None
    award_date: Optional[date] = None
    description: Optional[str] = None

class Award(AwardBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True
        
class VolunteeringBase(BaseModel):
    organization: str
    role: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_current: Optional[bool] = False
    description: Optional[str] = None
class Volunteering(VolunteeringBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True
class AdditionalInfoBase(BaseModel):
    driving_license: Optional[str] = None
    military_status: Optional[str] = None
    availability: Optional[str] = None
    willing_to_relocate: Optional[bool] = None
    willing_to_travel: Optional[bool] = None

class AdditionalInfo(AdditionalInfoBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class HobbyBase(BaseModel):
    hobby: str

class Hobby(HobbyBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True

class FullCV(BaseModel):
    personal_info: Optional[PersonalInfo] = None
    addresses: List[Address] = []
    work_experience: List[WorkExperience] = []
    education: List[Education] = []
    technical_skills: List[TechnicalSkill] = []
    soft_skills: List[SoftSkill] = []
    languages: List[Language] = []
    certifications: List[Certification] = []
    projects: List[Project] = []
    publications: List[Publication] = []
    awards: List[Award] = []
    volunteering: List[Volunteering] = []
    hobbies: List[Hobby] = []
    additional_info: Optional[AdditionalInfo] = None

    class Config:
        from_attributes = True

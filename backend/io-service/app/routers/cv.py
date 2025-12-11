from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import logging

from ..database import get_db
from ..models import cv as models
from ..schemas import cv as schemas
from ..dependencies import RoleChecker
from ..models.role import UserRole

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/cv",
    tags=["cv"],
    responses={404: {"description": "Not found"}},
)

allow_any_authenticated_user = Depends(RoleChecker([UserRole.ADMIN, UserRole.USER]))
allow_admin_only = Depends(RoleChecker([UserRole.ADMIN]))

@router.get("/{employee_id}", response_model=schemas.FullCV, dependencies=[allow_any_authenticated_user])
def get_employee_cv(employee_id: int, db: Session = Depends(get_db)):
    try:
        personal_info = db.query(models.EmployeePersonalInfo).filter(models.EmployeePersonalInfo.employee_id == employee_id).first()
        addresses = db.query(models.EmployeeAddress).filter(models.EmployeeAddress.employee_id == employee_id).all()
        work_experience = db.query(models.EmployeeWorkExperience).filter(models.EmployeeWorkExperience.employee_id == employee_id).all()
        education = db.query(models.EmployeeEducation).filter(models.EmployeeEducation.employee_id == employee_id).all()
        technical_skills = db.query(models.EmployeeTechnicalSkill).filter(models.EmployeeTechnicalSkill.employee_id == employee_id).all()
        soft_skills = db.query(models.EmployeeSoftSkill).filter(models.EmployeeSoftSkill.employee_id == employee_id).all()
        languages = db.query(models.EmployeeLanguage).filter(models.EmployeeLanguage.employee_id == employee_id).all()
        certifications = db.query(models.EmployeeCertification).filter(models.EmployeeCertification.employee_id == employee_id).all()
        projects = db.query(models.EmployeeProject).filter(models.EmployeeProject.employee_id == employee_id).all()
        publications = db.query(models.EmployeePublication).filter(models.EmployeePublication.employee_id == employee_id).all()
        awards = db.query(models.EmployeeAward).filter(models.EmployeeAward.employee_id == employee_id).all()
        volunteering = db.query(models.EmployeeVolunteering).filter(models.EmployeeVolunteering.employee_id == employee_id).all()
        hobbies = db.query(models.EmployeeHobby).filter(models.EmployeeHobby.employee_id == employee_id).all()
        additional_info = db.query(models.EmployeeAdditionalInfo).filter(models.EmployeeAdditionalInfo.employee_id == employee_id).first()
        

        return schemas.FullCV(
            personal_info=schemas.PersonalInfo.model_validate(personal_info) if personal_info else None,
            addresses=[schemas.Address.model_validate(a) for a in addresses],
            work_experience=[schemas.WorkExperience.model_validate(w) for w in work_experience],
            education=[schemas.Education.model_validate(e) for e in education],
            technical_skills=[schemas.TechnicalSkill.model_validate(t) for t in technical_skills],
            soft_skills=[schemas.SoftSkill.model_validate(s) for s in soft_skills],
            languages=[schemas.Language.model_validate(l) for l in languages],
            certifications=[schemas.Certification.model_validate(c) for c in certifications],
            projects=[schemas.Project.model_validate(p) for p in projects],
            publications=[schemas.Publication.model_validate(pub) for pub in publications],
            awards=[schemas.Award.model_validate(a) for a in awards],
            volunteering=[schemas.Volunteering.model_validate(v) for v in volunteering],
            hobbies=[schemas.Hobby.model_validate(h) for h in hobbies],
            additional_info=schemas.AdditionalInfo.model_validate(additional_info) if additional_info else None
        )
    except Exception as e:
        logger.error(f"Error fetching CV for employee {employee_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

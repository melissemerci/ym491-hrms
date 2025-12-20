from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import logging
import json
from datetime import datetime
from dateutil import parser as date_parser

from ..database import get_db
from ..models import cv as models
from ..models import candidate as candidate_models
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


def parse_date(date_str: str) -> datetime.date:
    """Parse various date formats to datetime.date object."""
    if not date_str or date_str == "":
        return None
    try:
        # Try parsing as ISO format first
        if "T" in date_str:
            return datetime.fromisoformat(date_str.replace("Z", "+00:00")).date()
        # Try parsing YYYY-MM format
        if len(date_str) == 7 and date_str[4] == "-":
            return datetime.strptime(date_str + "-01", "%Y-%m-%d").date()
        # Try parsing full date
        return date_parser.parse(date_str).date()
    except Exception as e:
        logger.warning(f"Failed to parse date '{date_str}': {e}")
        return None

@router.post("/save-analyzed-cv")
def save_analyzed_cv(cv_data: Dict[str, Any], db: Session = Depends(get_db)):
    """
    Save analyzed CV data from n8n to the candidate database tables.
    Expects the analyzed CV data in the n8n response format.
    Returns the candidate_id that can be used to retrieve the data.
    """
    try:
        # Extract or generate candidate_id
        candidate_id = cv_data.get("employee_id", "")
        if not candidate_id:
            # Generate new candidate_id based on timestamp
            candidate_id = f"EMP-{int(datetime.now().timestamp() * 1000)}"
        
        logger.info(f"Saving CV data for candidate_id: {candidate_id}")
        
        # Check if candidate already exists
        existing_candidate = db.query(candidate_models.Candidate).filter(
            candidate_models.Candidate.candidate_id == candidate_id
        ).first()
        
        if existing_candidate:
            logger.warning(f"Candidate {candidate_id} already exists. Updating existing record.")
            # Delete existing related data to replace with new data
            db.query(candidate_models.CandidatePersonalInfo).filter(
                candidate_models.CandidatePersonalInfo.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateAddress).filter(
                candidate_models.CandidateAddress.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateWorkExperience).filter(
                candidate_models.CandidateWorkExperience.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateEducation).filter(
                candidate_models.CandidateEducation.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateTechnicalSkill).filter(
                candidate_models.CandidateTechnicalSkill.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateSoftSkill).filter(
                candidate_models.CandidateSoftSkill.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateLanguage).filter(
                candidate_models.CandidateLanguage.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateCertification).filter(
                candidate_models.CandidateCertification.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateProject).filter(
                candidate_models.CandidateProject.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidatePublication).filter(
                candidate_models.CandidatePublication.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateAward).filter(
                candidate_models.CandidateAward.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateVolunteering).filter(
                candidate_models.CandidateVolunteering.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateAdditionalInfo).filter(
                candidate_models.CandidateAdditionalInfo.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateHobby).filter(
                candidate_models.CandidateHobby.candidate_id == candidate_id
            ).delete()
            db.query(candidate_models.CandidateRawData).filter(
                candidate_models.CandidateRawData.candidate_id == candidate_id
            ).delete()
            db.commit()
        
        # Create main candidate record
        candidate = candidate_models.Candidate(
            candidate_id=candidate_id,
            full_name=cv_data.get("full_name", ""),
            email=cv_data.get("email"),
            phone=cv_data.get("phone"),
            original_filename=cv_data.get("original_filename"),
            source=cv_data.get("source", "CV Upload - AI Parsed"),
            completeness_score=cv_data.get("completeness_score", 0),
            profile_status=cv_data.get("profile_status", "Complete"),
            total_experience_years=cv_data.get("total_experience_years", 0),
            current_position=cv_data.get("current_position"),
            current_company=cv_data.get("current_company"),
            highest_degree=cv_data.get("highest_degree"),
            field_of_study=cv_data.get("field_of_study"),
            institution=cv_data.get("institution"),
            certifications_count=cv_data.get("certifications_count", 0),
            projects_count=cv_data.get("projects_count", 0),
            volunteering_count=cv_data.get("volunteering_count", 0)
        )
        
        if existing_candidate:
            db.merge(candidate)
        else:
            db.add(candidate)
        db.flush()
        
        logger.info(f"Saving CV data for candidate_id: {candidate_id}")
        
        # Parse raw_structured_data if it's a string
        raw_data = cv_data.get("raw_structured_data", {})
        if isinstance(raw_data, str):
            raw_data = json.loads(raw_data)
        
        # Save raw data for future reference
        raw_data_record = candidate_models.CandidateRawData(
            candidate_id=candidate_id,
            raw_structured_data=raw_data,
            n8n_response=cv_data
        )
        db.add(raw_data_record)
        
        # 1. Save Personal Information
        personal_info_data = raw_data.get("personal_information", {})
        personal_info = candidate_models.CandidatePersonalInfo(
            candidate_id=candidate_id,
            birth_date=parse_date(personal_info_data.get("birth_date")),
            gender=personal_info_data.get("gender"),
            nationality=personal_info_data.get("nationality"),
            email=cv_data.get("email") or personal_info_data.get("email"),
            phone=cv_data.get("phone") or personal_info_data.get("phone"),
            website=personal_info_data.get("website"),
            linkedin_url=cv_data.get("linkedin_url") or personal_info_data.get("linkedin"),
            github_url=cv_data.get("github_url") or personal_info_data.get("github"),
            professional_title=cv_data.get("professional_title"),
            professional_summary=cv_data.get("professional_summary")
        )
        db.add(personal_info)
        
        # 2. Save Address
        location = cv_data.get("location", "Not Specified")
        if location and location != "Not Specified":
            parts = location.split(",")
            address = candidate_models.CandidateAddress(
                candidate_id=candidate_id,
                city=parts[0].strip() if len(parts) > 0 else "",
                country=parts[1].strip() if len(parts) > 1 else "",
                is_current=True
            )
            db.add(address)
        
        # Also parse from raw_structured_data
        address_data = personal_info_data.get("address", {})
        if address_data and (address_data.get("city") or address_data.get("country")):
            address = candidate_models.CandidateAddress(
                candidate_id=candidate_id,
                country=address_data.get("country"),
                city=address_data.get("city"),
                street=address_data.get("street"),
                postal_code=address_data.get("postal_code"),
                is_current=True
            )
            db.add(address)
        
        # 3. Save Work Experience
        work_exp_list = cv_data.get("work_experience", [])
        if isinstance(work_exp_list, str):
            work_exp_list = json.loads(work_exp_list)
        
        for work_exp_data in work_exp_list:
            location_data = work_exp_data.get("location", {})
            work_exp = candidate_models.CandidateWorkExperience(
                candidate_id=candidate_id,
                job_title=work_exp_data.get("job_title", ""),
                company=work_exp_data.get("company", ""),
                employment_type=work_exp_data.get("employment_type"),
                country=location_data.get("country") if isinstance(location_data, dict) else None,
                city=location_data.get("city") if isinstance(location_data, dict) else None,
                start_date=parse_date(work_exp_data.get("start_date")),
                end_date=parse_date(work_exp_data.get("end_date")),
                is_current=work_exp_data.get("is_current", False)
            )
            db.add(work_exp)
            db.flush()  # Get the ID
            
            # Add responsibilities
            for resp in work_exp_data.get("responsibilities", []):
                responsibility = candidate_models.CandidateWorkExperienceResponsibility(
                    work_experience_id=work_exp.id,
                    responsibility=resp
                )
                db.add(responsibility)
            
            # Add achievements
            for achievement in work_exp_data.get("achievements", []):
                ach = candidate_models.CandidateWorkExperienceAchievement(
                    work_experience_id=work_exp.id,
                    achievement=achievement
                )
                db.add(ach)
            
            # Add technologies
            for tech in work_exp_data.get("technologies_used", []):
                technology = candidate_models.CandidateWorkExperienceTechnology(
                    work_experience_id=work_exp.id,
                    technology=tech
                )
                db.add(technology)
        
        # 4. Save Education
        education_list = cv_data.get("education_details", [])
        if isinstance(education_list, str):
            education_list = json.loads(education_list)
        
        for edu_data in education_list:
            education = candidate_models.CandidateEducation(
                candidate_id=candidate_id,
                institution=edu_data.get("institution", ""),
                degree=edu_data.get("degree"),
                field_of_study=edu_data.get("field_of_study"),
                gpa=edu_data.get("gpa"),
                start_date=parse_date(edu_data.get("start_date")),
                end_date=parse_date(edu_data.get("end_date")),
                is_current=edu_data.get("is_current", False),
                thesis=edu_data.get("thesis")
            )
            db.add(education)
            db.flush()
            
            # Add courses
            for course in edu_data.get("courses", []):
                course_obj = candidate_models.CandidateEducationCourse(
                    education_id=education.id,
                    course_name=course
                )
                db.add(course_obj)
        
        # 5. Save Skills
        skills_data = raw_data.get("skills", {})
        
        # Technical skills
        technical_skills_list = skills_data.get("technical_skills", [])
        for skill_category in technical_skills_list:
            category_name = skill_category.get("skill_category", "General")
            for skill_name in skill_category.get("skills", []):
                tech_skill = candidate_models.CandidateTechnicalSkill(
                    candidate_id=candidate_id,
                    skill_name=skill_name
                )
                db.add(tech_skill)
        
        # Soft skills
        for soft_skill_name in skills_data.get("soft_skills", []):
            soft_skill = candidate_models.CandidateSoftSkill(
                candidate_id=candidate_id,
                skill_name=soft_skill_name
            )
            db.add(soft_skill)
        
        # Languages
        languages_list = skills_data.get("languages", [])
        for lang_data in languages_list:
            if isinstance(lang_data, dict):
                language = candidate_models.CandidateLanguage(
                    candidate_id=candidate_id,
                    language=lang_data.get("language", ""),
                    proficiency=lang_data.get("proficiency")
                )
                db.add(language)
        
        # 6. Save Certifications
        certifications_list = raw_data.get("certifications", [])
        for cert_data in certifications_list:
            certification = candidate_models.CandidateCertification(
                candidate_id=candidate_id,
                certification_name=cert_data.get("certification_name", ""),
                issuing_organization=cert_data.get("issuing_organization"),
                issue_date=parse_date(cert_data.get("issue_date")),
                expiration_date=parse_date(cert_data.get("expiration_date")),
                credential_id=cert_data.get("credential_id"),
                credential_url=cert_data.get("credential_url"),
                does_not_expire=cert_data.get("does_not_expire", False)
            )
            db.add(certification)
        
        # 7. Save Projects
        projects_list = cv_data.get("projects", [])
        if isinstance(projects_list, str):
            projects_list = json.loads(projects_list)
        
        for project_data in projects_list:
            project = candidate_models.CandidateProject(
                candidate_id=candidate_id,
                project_name=project_data.get("project_name", ""),
                description=project_data.get("description"),
                role=project_data.get("role"),
                start_date=parse_date(project_data.get("start_date")),
                end_date=parse_date(project_data.get("end_date")),
                is_current=project_data.get("is_current", False)
            )
            db.add(project)
            db.flush()
            
            # Add technologies
            for tech in project_data.get("technologies", []):
                technology = candidate_models.CandidateProjectTechnology(
                    project_id=project.id,
                    technology=tech
                )
                db.add(technology)
            
            # Add achievements
            for achievement in project_data.get("achievements", []):
                ach = candidate_models.CandidateProjectAchievement(
                    project_id=project.id,
                    achievement=achievement
                )
                db.add(ach)
            
            # Add links
            for link in project_data.get("links", []):
                project_link = candidate_models.CandidateProjectLink(
                    project_id=project.id,
                    url=link
                )
                db.add(project_link)
        
        # 8. Save Publications
        publications_list = raw_data.get("publications", [])
        for pub_data in publications_list:
            publication = candidate_models.CandidatePublication(
                candidate_id=candidate_id,
                title=pub_data.get("title", ""),
                publication_type=pub_data.get("publication_type"),
                publisher=pub_data.get("publisher"),
                publication_date=parse_date(pub_data.get("publication_date")),
                url=pub_data.get("url"),
                description=pub_data.get("description")
            )
            db.add(publication)
        
        # 9. Save Awards
        awards_list = raw_data.get("awards", [])
        for award_data in awards_list:
            award = candidate_models.CandidateAward(
                candidate_id=candidate_id,
                award_name=award_data.get("award_name", ""),
                issuer=award_data.get("issuer"),
                award_date=parse_date(award_data.get("date")),
                description=award_data.get("description")
            )
            db.add(award)
        
        # 10. Save Volunteering
        volunteering_list = cv_data.get("volunteering", [])
        if isinstance(volunteering_list, str):
            volunteering_list = json.loads(volunteering_list)
        
        for vol_data in volunteering_list:
            volunteering = candidate_models.CandidateVolunteering(
                candidate_id=candidate_id,
                role=vol_data.get("role", ""),
                organization=vol_data.get("organization", ""),
                start_date=parse_date(vol_data.get("start_date")),
                end_date=parse_date(vol_data.get("end_date")),
                is_current=vol_data.get("is_current", False)
            )
            db.add(volunteering)
            db.flush()
            
            # Add responsibilities
            for resp in vol_data.get("responsibilities", []):
                responsibility = candidate_models.CandidateVolunteeringResponsibility(
                    volunteering_id=volunteering.id,
                    responsibility=resp
                )
                db.add(responsibility)
        
        # 11. Save Additional Information
        additional_info_data = raw_data.get("additional_information", {})
        additional_info = candidate_models.CandidateAdditionalInfo(
            candidate_id=candidate_id,
            driving_license=additional_info_data.get("driving_license"),
            military_status=additional_info_data.get("military_status"),
            availability=additional_info_data.get("availability"),
            willing_to_relocate=additional_info_data.get("willing_to_relocate", False),
            willing_to_travel=additional_info_data.get("willing_to_travel", False)
        )
        db.add(additional_info)
        
        # 12. Save Hobbies
        hobbies_list = additional_info_data.get("hobbies", [])
        for hobby_name in hobbies_list:
            hobby = candidate_models.CandidateHobby(
                candidate_id=candidate_id,
                hobby=hobby_name
            )
            db.add(hobby)
        
        # Commit all changes
        db.commit()
        
        logger.info(f"Successfully saved CV data for candidate_id: {candidate_id}")
        
        return {
            "success": True,
            "candidate_id": candidate_id,
            "message": "CV data saved successfully"
        }
        
    except Exception as e:
        db.rollback()
        logger.error(f"Error saving CV data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to save CV data: {str(e)}")


@router.get("/candidate/{candidate_id}")
def get_candidate_cv(candidate_id: str, db: Session = Depends(get_db)):
    """
    Retrieve complete CV data for a candidate by their candidate_id.
    Returns all information stored in the candidate tables.
    """
    try:
        # Get main candidate record
        candidate = db.query(candidate_models.Candidate).filter(
            candidate_models.Candidate.candidate_id == candidate_id
        ).first()
        
        if not candidate:
            raise HTTPException(status_code=404, detail=f"Candidate {candidate_id} not found")
        
        # Get all related data
        personal_info = db.query(candidate_models.CandidatePersonalInfo).filter(
            candidate_models.CandidatePersonalInfo.candidate_id == candidate_id
        ).first()
        
        addresses = db.query(candidate_models.CandidateAddress).filter(
            candidate_models.CandidateAddress.candidate_id == candidate_id
        ).all()
        
        work_experience = db.query(candidate_models.CandidateWorkExperience).filter(
            candidate_models.CandidateWorkExperience.candidate_id == candidate_id
        ).all()
        
        education = db.query(candidate_models.CandidateEducation).filter(
            candidate_models.CandidateEducation.candidate_id == candidate_id
        ).all()
        
        technical_skills = db.query(candidate_models.CandidateTechnicalSkill).filter(
            candidate_models.CandidateTechnicalSkill.candidate_id == candidate_id
        ).all()
        
        soft_skills = db.query(candidate_models.CandidateSoftSkill).filter(
            candidate_models.CandidateSoftSkill.candidate_id == candidate_id
        ).all()
        
        languages = db.query(candidate_models.CandidateLanguage).filter(
            candidate_models.CandidateLanguage.candidate_id == candidate_id
        ).all()
        
        certifications = db.query(candidate_models.CandidateCertification).filter(
            candidate_models.CandidateCertification.candidate_id == candidate_id
        ).all()
        
        projects = db.query(candidate_models.CandidateProject).filter(
            candidate_models.CandidateProject.candidate_id == candidate_id
        ).all()
        
        publications = db.query(candidate_models.CandidatePublication).filter(
            candidate_models.CandidatePublication.candidate_id == candidate_id
        ).all()
        
        awards = db.query(candidate_models.CandidateAward).filter(
            candidate_models.CandidateAward.candidate_id == candidate_id
        ).all()
        
        volunteering = db.query(candidate_models.CandidateVolunteering).filter(
            candidate_models.CandidateVolunteering.candidate_id == candidate_id
        ).all()
        
        hobbies = db.query(candidate_models.CandidateHobby).filter(
            candidate_models.CandidateHobby.candidate_id == candidate_id
        ).all()
        
        additional_info = db.query(candidate_models.CandidateAdditionalInfo).filter(
            candidate_models.CandidateAdditionalInfo.candidate_id == candidate_id
        ).first()
        
        raw_data = db.query(candidate_models.CandidateRawData).filter(
            candidate_models.CandidateRawData.candidate_id == candidate_id
        ).first()
        
        # Build response
        return {
            "success": True,
            "candidate": {
                "candidate_id": candidate.candidate_id,
                "full_name": candidate.full_name,
                "email": candidate.email,
                "phone": candidate.phone,
                "source": candidate.source,
                "completeness_score": candidate.completeness_score,
                "profile_status": candidate.profile_status,
                "total_experience_years": float(candidate.total_experience_years) if candidate.total_experience_years else 0,
                "current_position": candidate.current_position,
                "current_company": candidate.current_company,
                "highest_degree": candidate.highest_degree,
                "field_of_study": candidate.field_of_study,
                "institution": candidate.institution,
            },
            "personal_info": {
                "birth_date": str(personal_info.birth_date) if personal_info and personal_info.birth_date else None,
                "gender": personal_info.gender if personal_info else None,
                "nationality": personal_info.nationality if personal_info else None,
                "email": personal_info.email if personal_info else None,
                "phone": personal_info.phone if personal_info else None,
                "website": personal_info.website if personal_info else None,
                "linkedin_url": personal_info.linkedin_url if personal_info else None,
                "github_url": personal_info.github_url if personal_info else None,
                "professional_title": personal_info.professional_title if personal_info else None,
                "professional_summary": personal_info.professional_summary if personal_info else None,
            } if personal_info else None,
            "addresses": [
                {
                    "country": addr.country,
                    "city": addr.city,
                    "street": addr.street,
                    "postal_code": addr.postal_code,
                    "is_current": addr.is_current
                }
                for addr in addresses
            ],
            "work_experience": [
                {
                    "job_title": we.job_title,
                    "company": we.company,
                    "employment_type": we.employment_type,
                    "country": we.country,
                    "city": we.city,
                    "start_date": str(we.start_date) if we.start_date else None,
                    "end_date": str(we.end_date) if we.end_date else None,
                    "is_current": we.is_current,
                    "responsibilities": [r.responsibility for r in we.responsibilities],
                    "achievements": [a.achievement for a in we.achievements],
                    "technologies": [t.technology for t in we.technologies]
                }
                for we in work_experience
            ],
            "education": [
                {
                    "institution": edu.institution,
                    "degree": edu.degree,
                    "field_of_study": edu.field_of_study,
                    "gpa": edu.gpa,
                    "start_date": str(edu.start_date) if edu.start_date else None,
                    "end_date": str(edu.end_date) if edu.end_date else None,
                    "is_current": edu.is_current,
                    "thesis": edu.thesis,
                    "courses": [c.course_name for c in edu.courses]
                }
                for edu in education
            ],
            "technical_skills": [skill.skill_name for skill in technical_skills],
            "soft_skills": [skill.skill_name for skill in soft_skills],
            "languages": [
                {
                    "language": lang.language,
                    "proficiency": lang.proficiency
                }
                for lang in languages
            ],
            "certifications": [
                {
                    "certification_name": cert.certification_name,
                    "issuing_organization": cert.issuing_organization,
                    "issue_date": str(cert.issue_date) if cert.issue_date else None,
                    "expiration_date": str(cert.expiration_date) if cert.expiration_date else None,
                    "credential_id": cert.credential_id,
                    "credential_url": cert.credential_url,
                    "does_not_expire": cert.does_not_expire
                }
                for cert in certifications
            ],
            "projects": [
                {
                    "project_name": proj.project_name,
                    "description": proj.description,
                    "role": proj.role,
                    "start_date": str(proj.start_date) if proj.start_date else None,
                    "end_date": str(proj.end_date) if proj.end_date else None,
                    "is_current": proj.is_current,
                    "technologies": [t.technology for t in proj.technologies],
                    "achievements": [a.achievement for a in proj.achievements],
                    "links": [l.url for l in proj.links]
                }
                for proj in projects
            ],
            "publications": [
                {
                    "title": pub.title,
                    "publication_type": pub.publication_type,
                    "publisher": pub.publisher,
                    "publication_date": str(pub.publication_date) if pub.publication_date else None,
                    "url": pub.url,
                    "description": pub.description
                }
                for pub in publications
            ],
            "awards": [
                {
                    "award_name": award.award_name,
                    "issuer": award.issuer,
                    "award_date": str(award.award_date) if award.award_date else None,
                    "description": award.description
                }
                for award in awards
            ],
            "volunteering": [
                {
                    "role": vol.role,
                    "organization": vol.organization,
                    "start_date": str(vol.start_date) if vol.start_date else None,
                    "end_date": str(vol.end_date) if vol.end_date else None,
                    "is_current": vol.is_current,
                    "responsibilities": [r.responsibility for r in vol.responsibilities]
                }
                for vol in volunteering
            ],
            "hobbies": [hobby.hobby for hobby in hobbies],
            "additional_info": {
                "driving_license": additional_info.driving_license if additional_info else None,
                "military_status": additional_info.military_status if additional_info else None,
                "availability": additional_info.availability if additional_info else None,
                "willing_to_relocate": additional_info.willing_to_relocate if additional_info else False,
                "willing_to_travel": additional_info.willing_to_travel if additional_info else False
            } if additional_info else None,
            "raw_data": raw_data.raw_structured_data if raw_data else None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching candidate CV {candidate_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


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

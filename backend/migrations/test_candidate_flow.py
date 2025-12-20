"""
Test script for candidate CV flow

This script tests:
1. Saving analyzed CV data to candidate tables
2. Retrieving candidate data from the database

Usage:
    python test_candidate_flow.py
"""

import requests
import json

# Configuration
BASE_URL = "http://localhost"  # Adjust if needed
IO_SERVICE_URL = f"{BASE_URL}/api/io"

# Sample n8n response (based on the actual format)
SAMPLE_CV_DATA = {
    "employee_id": "EMP-TEST-123456",
    "timestamp": "2025-12-19T09:42:13.536Z",
    "original_filename": "test_cv.pdf",
    "full_name": "Test Candidate",
    "email": "test@example.com",
    "phone": "+1234567890",
    "location": "Istanbul, Turkey",
    "linkedin_url": "https://www.linkedin.com/in/test-candidate",
    "github_url": "https://github.com/testcandidate",
    "professional_title": "Software Engineer",
    "professional_summary": "Experienced software engineer with 5+ years of experience.",
    "total_experience_years": 5.5,
    "current_position": "Senior Software Engineer",
    "current_company": "Tech Company Inc.",
    "work_experience": json.dumps([
        {
            "job_title": "Senior Software Engineer",
            "company": "Tech Company Inc.",
            "employment_type": "Full-time",
            "location": {"country": "Turkey", "city": "Istanbul"},
            "start_date": "2020-01",
            "end_date": None,
            "is_current": True,
            "responsibilities": [
                "Led development of microservices architecture",
                "Mentored junior developers"
            ],
            "achievements": ["Improved system performance by 40%"],
            "technologies_used": ["Python", "FastAPI", "PostgreSQL", "Docker"]
        }
    ]),
    "highest_degree": "Bachelor's",
    "field_of_study": "Computer Science",
    "institution": "Test University",
    "education_details": json.dumps([
        {
            "institution": "Test University",
            "degree": "Bachelor's",
            "field_of_study": "Computer Science",
            "gpa": "3.8",
            "start_date": "2015-09",
            "end_date": "2019-06",
            "is_current": False,
            "courses": ["Data Structures", "Algorithms", "Database Systems"],
            "thesis": ""
        }
    ]),
    "technical_skills": "Python, JavaScript, React, FastAPI, PostgreSQL, Docker",
    "soft_skills": "Leadership, Communication, Problem Solving",
    "languages": "English (Fluent), Turkish (Native)",
    "certifications": "None",
    "certifications_count": 0,
    "projects": json.dumps([
        {
            "project_name": "E-commerce Platform",
            "description": "Built a scalable e-commerce platform",
            "role": "Lead Developer",
            "start_date": "2021-01",
            "end_date": "2021-12",
            "is_current": False,
            "technologies": ["Python", "React", "PostgreSQL"],
            "achievements": ["Handled 10K+ daily users"],
            "links": []
        }
    ]),
    "projects_count": 1,
    "volunteering": json.dumps([]),
    "volunteering_count": 0,
    "completeness_score": 95,
    "profile_status": "Complete",
    "processed_date": "2025-12-19T09:42:13.537Z",
    "last_updated": "2025-12-19T09:42:13.537Z",
    "source": "CV Upload - AI Parsed",
    "raw_structured_data": json.dumps({
        "personal_information": {
            "full_name": "Test Candidate",
            "email": "test@example.com",
            "phone": "+1234567890",
            "linkedin": "https://www.linkedin.com/in/test-candidate",
            "github": "https://github.com/testcandidate",
            "address": {"country": "Turkey", "city": "Istanbul"}
        },
        "summary": {
            "professional_title": "Software Engineer",
            "short_summary": "Experienced software engineer with 5+ years of experience."
        },
        "skills": {
            "technical_skills": [
                {
                    "skill_category": "Programming Languages",
                    "skills": ["Python", "JavaScript"]
                },
                {
                    "skill_category": "Frameworks",
                    "skills": ["React", "FastAPI"]
                }
            ],
            "soft_skills": ["Leadership", "Communication", "Problem Solving"],
            "languages": [
                {"language": "English", "proficiency": "Fluent"},
                {"language": "Turkish", "proficiency": "Native"}
            ]
        },
        "certifications": [],
        "publications": [],
        "awards": [],
        "additional_information": {
            "hobbies": ["Reading", "Coding"],
            "driving_license": "B",
            "military_status": "Completed",
            "availability": "Immediate",
            "willing_to_relocate": True,
            "willing_to_travel": False
        }
    })
}


def test_save_candidate():
    """Test saving candidate CV data"""
    print("=" * 60)
    print("TEST 1: Saving Candidate CV Data")
    print("=" * 60)
    
    url = f"{IO_SERVICE_URL}/cv/save-analyzed-cv"
    
    try:
        response = requests.post(url, json=SAMPLE_CV_DATA)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Successfully saved candidate CV data!")
            print(f"   Candidate ID: {result.get('candidate_id')}")
            print(f"   Message: {result.get('message')}")
            return result.get('candidate_id')
        else:
            print(f"❌ Failed to save candidate CV data")
            print(f"   Status Code: {response.status_code}")
            print(f"   Response: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return None


def test_retrieve_candidate(candidate_id):
    """Test retrieving candidate CV data"""
    print("\n" + "=" * 60)
    print("TEST 2: Retrieving Candidate CV Data")
    print("=" * 60)
    
    if not candidate_id:
        print("⚠️  Skipping test - no candidate_id provided")
        return
    
    url = f"{IO_SERVICE_URL}/cv/candidate/{candidate_id}"
    
    try:
        response = requests.get(url)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Successfully retrieved candidate CV data!")
            print(f"\n📋 Candidate Summary:")
            print(f"   Name: {result['candidate']['full_name']}")
            print(f"   Email: {result['candidate']['email']}")
            print(f"   Position: {result['candidate']['current_position']}")
            print(f"   Company: {result['candidate']['current_company']}")
            print(f"   Experience: {result['candidate']['total_experience_years']} years")
            print(f"   Completeness: {result['candidate']['completeness_score']}%")
            print(f"\n📊 Data Sections:")
            print(f"   ✓ Personal Info: {'Yes' if result['personal_info'] else 'No'}")
            print(f"   ✓ Addresses: {len(result['addresses'])} record(s)")
            print(f"   ✓ Work Experience: {len(result['work_experience'])} position(s)")
            print(f"   ✓ Education: {len(result['education'])} degree(s)")
            print(f"   ✓ Technical Skills: {len(result['technical_skills'])} skill(s)")
            print(f"   ✓ Soft Skills: {len(result['soft_skills'])} skill(s)")
            print(f"   ✓ Languages: {len(result['languages'])} language(s)")
            print(f"   ✓ Projects: {len(result['projects'])} project(s)")
            return True
        else:
            print(f"❌ Failed to retrieve candidate CV data")
            print(f"   Status Code: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False


def test_analyze_and_save():
    """Test the analyze endpoint with save_to_db option"""
    print("\n" + "=" * 60)
    print("TEST 3: Analyze CV with Auto-Save (Optional)")
    print("=" * 60)
    print("⚠️  This test requires a real CV file uploaded first.")
    print("   You can test this manually:")
    print(f"   1. Upload a CV: POST {IO_SERVICE_URL}/cv-application/upload-and-check")
    print(f"   2. Analyze & Save: POST {IO_SERVICE_URL}/cv-application/analyze")
    print("      with save_to_db=true")


def main():
    print("\n" + "=" * 60)
    print("🧪 CANDIDATE CV FLOW TEST SUITE")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print(f"IO Service: {IO_SERVICE_URL}")
    print("")
    
    # Test 1: Save candidate data
    candidate_id = test_save_candidate()
    
    # Test 2: Retrieve candidate data
    if candidate_id:
        test_retrieve_candidate(candidate_id)
    
    # Test 3: Info about analyze endpoint
    test_analyze_and_save()
    
    print("\n" + "=" * 60)
    print("✨ TEST SUITE COMPLETED")
    print("=" * 60)
    
    if candidate_id:
        print(f"\n💡 You can now retrieve this candidate's data anytime:")
        print(f"   GET {IO_SERVICE_URL}/cv/candidate/{candidate_id}")
        print(f"\n💡 Or query the database directly:")
        print(f"   SELECT * FROM candidates WHERE candidate_id = '{candidate_id}';")


if __name__ == "__main__":
    main()


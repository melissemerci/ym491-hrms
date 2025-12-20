-- Migration: Create candidate tables
-- Description: Creates all necessary tables to store analyzed CV data for candidates
-- Date: 2025-12-19

-- ========================================
-- Main Candidates Table
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidates (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) UNIQUE NOT NULL,  -- e.g., EMP-1766137333536
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    original_filename VARCHAR(255),
    file_url VARCHAR(500),
    source VARCHAR(100) DEFAULT 'CV Upload - AI Parsed',
    completeness_score INTEGER DEFAULT 0,
    profile_status VARCHAR(50) DEFAULT 'Complete',
    total_experience_years DECIMAL(4, 1) DEFAULT 0,
    current_position VARCHAR(200),
    current_company VARCHAR(200),
    highest_degree VARCHAR(100),
    field_of_study VARCHAR(150),
    institution VARCHAR(200),
    certifications_count INTEGER DEFAULT 0,
    projects_count INTEGER DEFAULT 0,
    volunteering_count INTEGER DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidates_candidate_id ON public.candidates(candidate_id);
CREATE INDEX idx_candidates_email ON public.candidates(email);
CREATE INDEX idx_candidates_created_at ON public.candidates(created_at);

-- ========================================
-- Personal Information
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_personal_info (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    birth_date DATE,
    gender VARCHAR(20),
    nationality VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    website VARCHAR(255),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    professional_title VARCHAR(150),
    professional_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(candidate_id)
);

CREATE INDEX idx_candidate_personal_info_candidate_id ON public.candidate_personal_info(candidate_id);

-- ========================================
-- Addresses
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_addresses (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    address_type VARCHAR(50) DEFAULT 'primary',
    country VARCHAR(100),
    city VARCHAR(100),
    street TEXT,
    postal_code VARCHAR(20),
    is_current BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_addresses_candidate_id ON public.candidate_addresses(candidate_id);

-- ========================================
-- Work Experience
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_work_experience (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    job_title VARCHAR(150) NOT NULL,
    company VARCHAR(200) NOT NULL,
    employment_type VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_work_experience_candidate_id ON public.candidate_work_experience(candidate_id);

CREATE TABLE IF NOT EXISTS public.candidate_work_experience_responsibilities (
    id SERIAL PRIMARY KEY,
    work_experience_id INTEGER NOT NULL REFERENCES public.candidate_work_experience(id) ON DELETE CASCADE,
    responsibility TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

CREATE INDEX idx_candidate_work_exp_resp_work_exp_id ON public.candidate_work_experience_responsibilities(work_experience_id);

CREATE TABLE IF NOT EXISTS public.candidate_work_experience_achievements (
    id SERIAL PRIMARY KEY,
    work_experience_id INTEGER NOT NULL REFERENCES public.candidate_work_experience(id) ON DELETE CASCADE,
    achievement TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

CREATE INDEX idx_candidate_work_exp_ach_work_exp_id ON public.candidate_work_experience_achievements(work_experience_id);

CREATE TABLE IF NOT EXISTS public.candidate_work_experience_technologies (
    id SERIAL PRIMARY KEY,
    work_experience_id INTEGER NOT NULL REFERENCES public.candidate_work_experience(id) ON DELETE CASCADE,
    technology VARCHAR(100) NOT NULL
);

CREATE INDEX idx_candidate_work_exp_tech_work_exp_id ON public.candidate_work_experience_technologies(work_experience_id);

-- ========================================
-- Education
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_education (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(150),
    field_of_study VARCHAR(150),
    gpa VARCHAR(20),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    thesis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_education_candidate_id ON public.candidate_education(candidate_id);

CREATE TABLE IF NOT EXISTS public.candidate_education_courses (
    id SERIAL PRIMARY KEY,
    education_id INTEGER NOT NULL REFERENCES public.candidate_education(id) ON DELETE CASCADE,
    course_name VARCHAR(200) NOT NULL
);

CREATE INDEX idx_candidate_education_courses_education_id ON public.candidate_education_courses(education_id);

-- ========================================
-- Skills
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_technical_skills (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    skill_category_id INTEGER,
    skill_name VARCHAR(150) NOT NULL,
    proficiency_level VARCHAR(50),
    years_of_experience DECIMAL(4, 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_technical_skills_candidate_id ON public.candidate_technical_skills(candidate_id);

CREATE TABLE IF NOT EXISTS public.candidate_soft_skills (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_candidate_soft_skills_candidate_id ON public.candidate_soft_skills(candidate_id);

CREATE TABLE IF NOT EXISTS public.candidate_languages (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    language VARCHAR(100) NOT NULL,
    proficiency VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_languages_candidate_id ON public.candidate_languages(candidate_id);

-- ========================================
-- Certifications
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_certifications (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    certification_name VARCHAR(200) NOT NULL,
    issuing_organization VARCHAR(200),
    issue_date DATE,
    expiration_date DATE,
    credential_id VARCHAR(150),
    credential_url VARCHAR(255),
    does_not_expire BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_certifications_candidate_id ON public.candidate_certifications(candidate_id);

-- ========================================
-- Projects
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_projects (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    project_name VARCHAR(200) NOT NULL,
    description TEXT,
    role VARCHAR(150),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_projects_candidate_id ON public.candidate_projects(candidate_id);

CREATE TABLE IF NOT EXISTS public.candidate_project_technologies (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES public.candidate_projects(id) ON DELETE CASCADE,
    technology VARCHAR(100) NOT NULL
);

CREATE INDEX idx_candidate_project_tech_project_id ON public.candidate_project_technologies(project_id);

CREATE TABLE IF NOT EXISTS public.candidate_project_achievements (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES public.candidate_projects(id) ON DELETE CASCADE,
    achievement TEXT NOT NULL
);

CREATE INDEX idx_candidate_project_ach_project_id ON public.candidate_project_achievements(project_id);

CREATE TABLE IF NOT EXISTS public.candidate_project_links (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES public.candidate_projects(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    link_type VARCHAR(50)
);

CREATE INDEX idx_candidate_project_links_project_id ON public.candidate_project_links(project_id);

-- ========================================
-- Publications
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_publications (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    publication_type VARCHAR(100),
    publisher VARCHAR(200),
    publication_date DATE,
    url VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_publications_candidate_id ON public.candidate_publications(candidate_id);

-- ========================================
-- Awards
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_awards (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    award_name VARCHAR(200) NOT NULL,
    issuer VARCHAR(200),
    award_date DATE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_awards_candidate_id ON public.candidate_awards(candidate_id);

-- ========================================
-- Volunteering
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_volunteering (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    role VARCHAR(150) NOT NULL,
    organization VARCHAR(200) NOT NULL,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_candidate_volunteering_candidate_id ON public.candidate_volunteering(candidate_id);

CREATE TABLE IF NOT EXISTS public.candidate_volunteering_responsibilities (
    id SERIAL PRIMARY KEY,
    volunteering_id INTEGER NOT NULL REFERENCES public.candidate_volunteering(id) ON DELETE CASCADE,
    responsibility TEXT NOT NULL
);

CREATE INDEX idx_candidate_vol_resp_volunteering_id ON public.candidate_volunteering_responsibilities(volunteering_id);

-- ========================================
-- Additional Information
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_additional_info (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    driving_license VARCHAR(50),
    military_status VARCHAR(100),
    availability VARCHAR(100),
    willing_to_relocate BOOLEAN DEFAULT FALSE,
    willing_to_travel BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(candidate_id)
);

CREATE INDEX idx_candidate_additional_info_candidate_id ON public.candidate_additional_info(candidate_id);

-- ========================================
-- Hobbies
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_hobbies (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    hobby VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_candidate_hobbies_candidate_id ON public.candidate_hobbies(candidate_id);

-- ========================================
-- Raw Data Storage (for future reference)
-- ========================================

CREATE TABLE IF NOT EXISTS public.candidate_raw_data (
    id SERIAL PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL REFERENCES public.candidates(candidate_id) ON DELETE CASCADE,
    raw_structured_data JSONB,
    n8n_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(candidate_id)
);

CREATE INDEX idx_candidate_raw_data_candidate_id ON public.candidate_raw_data(candidate_id);
CREATE INDEX idx_candidate_raw_data_jsonb ON public.candidate_raw_data USING GIN (raw_structured_data);

-- ========================================
-- Comments
-- ========================================

COMMENT ON TABLE public.candidates IS 'Main table storing candidate basic information from analyzed CVs';
COMMENT ON TABLE public.candidate_personal_info IS 'Detailed personal information for candidates';
COMMENT ON TABLE public.candidate_work_experience IS 'Work experience history for candidates';
COMMENT ON TABLE public.candidate_education IS 'Education history for candidates';
COMMENT ON TABLE public.candidate_projects IS 'Projects worked on by candidates';
COMMENT ON TABLE public.candidate_raw_data IS 'Stores original n8n response and raw structured data for reference';


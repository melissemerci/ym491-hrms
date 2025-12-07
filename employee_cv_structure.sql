-- ============================================
-- EMPLOYEE DETAILS DATABASE SCHEMA
-- Extends existing employees table with comprehensive CV/Resume data
-- ============================================

-- 1. EMPLOYEE PERSONAL INFORMATION
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_personal_info
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL UNIQUE,
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
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_employee_personal_info_employee_id ON public.employee_personal_info(employee_id);

-- 2. EMPLOYEE ADDRESSES
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_addresses
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    address_type VARCHAR(50) DEFAULT 'primary', -- primary, secondary, etc.
    country VARCHAR(100),
    city VARCHAR(100),
    street TEXT,
    postal_code VARCHAR(20),
    is_current BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_employee_addresses_employee_id ON public.employee_addresses(employee_id);

-- 3. WORK EXPERIENCE
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_work_experience
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    company VARCHAR(200) NOT NULL,
    employment_type VARCHAR(50), -- Full-time, Part-time, Contract, Freelance, Internship
    country VARCHAR(100),
    city VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_work_experience_employee_id ON public.employee_work_experience(employee_id);
CREATE INDEX idx_work_experience_dates ON public.employee_work_experience(start_date, end_date);

-- 4. WORK EXPERIENCE RESPONSIBILITIES
-- ============================================
CREATE TABLE IF NOT EXISTS public.work_experience_responsibilities
(
    id SERIAL PRIMARY KEY,
    work_experience_id INTEGER NOT NULL,
    responsibility TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    CONSTRAINT fk_work_experience FOREIGN KEY (work_experience_id) 
        REFERENCES public.employee_work_experience(id) ON DELETE CASCADE
);

CREATE INDEX idx_responsibilities_work_exp_id ON public.work_experience_responsibilities(work_experience_id);

-- 5. WORK EXPERIENCE ACHIEVEMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.work_experience_achievements
(
    id SERIAL PRIMARY KEY,
    work_experience_id INTEGER NOT NULL,
    achievement TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    CONSTRAINT fk_work_experience FOREIGN KEY (work_experience_id) 
        REFERENCES public.employee_work_experience(id) ON DELETE CASCADE
);

CREATE INDEX idx_achievements_work_exp_id ON public.work_experience_achievements(work_experience_id);

-- 6. WORK EXPERIENCE TECHNOLOGIES
-- ============================================
CREATE TABLE IF NOT EXISTS public.work_experience_technologies
(
    id SERIAL PRIMARY KEY,
    work_experience_id INTEGER NOT NULL,
    technology VARCHAR(100) NOT NULL,
    CONSTRAINT fk_work_experience FOREIGN KEY (work_experience_id) 
        REFERENCES public.employee_work_experience(id) ON DELETE CASCADE
);

CREATE INDEX idx_technologies_work_exp_id ON public.work_experience_technologies(work_experience_id);

-- 7. EDUCATION
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_education
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(150),
    field_of_study VARCHAR(150),
    gpa VARCHAR(20),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    thesis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_education_employee_id ON public.employee_education(employee_id);
CREATE INDEX idx_education_dates ON public.employee_education(start_date, end_date);

-- 8. EDUCATION COURSES
-- ============================================
CREATE TABLE IF NOT EXISTS public.education_courses
(
    id SERIAL PRIMARY KEY,
    education_id INTEGER NOT NULL,
    course_name VARCHAR(200) NOT NULL,
    display_order INTEGER DEFAULT 0,
    CONSTRAINT fk_education FOREIGN KEY (education_id) 
        REFERENCES public.employee_education(id) ON DELETE CASCADE
);

CREATE INDEX idx_courses_education_id ON public.education_courses(education_id);

-- 9. SKILLS CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS public.skill_categories
(
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert common categories
INSERT INTO public.skill_categories (category_name) VALUES
    ('Programming Languages'),
    ('Frameworks & Libraries'),
    ('Databases'),
    ('DevOps & Cloud'),
    ('Tools & Software'),
    ('Design'),
    ('Project Management'),
    ('Data Science & ML'),
    ('Mobile Development'),
    ('Testing')
ON CONFLICT (category_name) DO NOTHING;

-- 10. TECHNICAL SKILLS
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_technical_skills
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    skill_category_id INTEGER,
    skill_name VARCHAR(150) NOT NULL,
    proficiency_level VARCHAR(50), -- Beginner, Intermediate, Advanced, Expert
    years_of_experience DECIMAL(4,1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE,
    CONSTRAINT fk_skill_category FOREIGN KEY (skill_category_id) 
        REFERENCES public.skill_categories(id) ON DELETE SET NULL
);

CREATE INDEX idx_technical_skills_employee_id ON public.employee_technical_skills(employee_id);
CREATE INDEX idx_technical_skills_category ON public.employee_technical_skills(skill_category_id);

-- 11. SOFT SKILLS
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_soft_skills
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_soft_skills_employee_id ON public.employee_soft_skills(employee_id);

-- 12. LANGUAGES
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_languages
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    language VARCHAR(100) NOT NULL,
    proficiency VARCHAR(50), -- Native, Fluent, Advanced, Intermediate, Beginner, A1-C2
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_languages_employee_id ON public.employee_languages(employee_id);

-- 13. CERTIFICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_certifications
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    certification_name VARCHAR(200) NOT NULL,
    issuing_organization VARCHAR(200),
    issue_date DATE,
    expiration_date DATE,
    credential_id VARCHAR(150),
    credential_url VARCHAR(255),
    does_not_expire BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_certifications_employee_id ON public.employee_certifications(employee_id);
CREATE INDEX idx_certifications_dates ON public.employee_certifications(issue_date, expiration_date);

-- 14. PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_projects
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    project_name VARCHAR(200) NOT NULL,
    description TEXT,
    role VARCHAR(150),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_projects_employee_id ON public.employee_projects(employee_id);
CREATE INDEX idx_projects_dates ON public.employee_projects(start_date, end_date);

-- 15. PROJECT TECHNOLOGIES
-- ============================================
CREATE TABLE IF NOT EXISTS public.project_technologies
(
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    technology VARCHAR(100) NOT NULL,
    CONSTRAINT fk_project FOREIGN KEY (project_id) 
        REFERENCES public.employee_projects(id) ON DELETE CASCADE
);

CREATE INDEX idx_project_technologies_project_id ON public.project_technologies(project_id);

-- 16. PROJECT ACHIEVEMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS public.project_achievements
(
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    achievement TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    CONSTRAINT fk_project FOREIGN KEY (project_id) 
        REFERENCES public.employee_projects(id) ON DELETE CASCADE
);

CREATE INDEX idx_project_achievements_project_id ON public.project_achievements(project_id);

-- 17. PROJECT LINKS
-- ============================================
CREATE TABLE IF NOT EXISTS public.project_links
(
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    link_url VARCHAR(255) NOT NULL,
    link_type VARCHAR(50), -- github, demo, documentation, etc.
    CONSTRAINT fk_project FOREIGN KEY (project_id) 
        REFERENCES public.employee_projects(id) ON DELETE CASCADE
);

CREATE INDEX idx_project_links_project_id ON public.project_links(project_id);

-- 18. PUBLICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_publications
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    title VARCHAR(300) NOT NULL,
    publication_type VARCHAR(100), -- Journal, Conference, Book, Article, etc.
    publisher VARCHAR(200),
    publication_date DATE,
    url VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_publications_employee_id ON public.employee_publications(employee_id);

-- 19. AWARDS
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_awards
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    award_name VARCHAR(200) NOT NULL,
    issuer VARCHAR(200),
    award_date DATE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_awards_employee_id ON public.employee_awards(employee_id);

-- 20. VOLUNTEERING
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_volunteering
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    role VARCHAR(150) NOT NULL,
    organization VARCHAR(200) NOT NULL,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_volunteering_employee_id ON public.employee_volunteering(employee_id);

-- 21. VOLUNTEERING RESPONSIBILITIES
-- ============================================
CREATE TABLE IF NOT EXISTS public.volunteering_responsibilities
(
    id SERIAL PRIMARY KEY,
    volunteering_id INTEGER NOT NULL,
    responsibility TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    CONSTRAINT fk_volunteering FOREIGN KEY (volunteering_id) 
        REFERENCES public.employee_volunteering(id) ON DELETE CASCADE
);

CREATE INDEX idx_volunteering_resp_volunteering_id ON public.volunteering_responsibilities(volunteering_id);

-- 22. ADDITIONAL INFORMATION
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_additional_info
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL UNIQUE,
    driving_license VARCHAR(50),
    military_status VARCHAR(100),
    availability VARCHAR(100), -- Immediate, 2 weeks, 1 month, etc.
    willing_to_relocate BOOLEAN DEFAULT FALSE,
    willing_to_travel BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_additional_info_employee_id ON public.employee_additional_info(employee_id);

-- 23. HOBBIES
-- ============================================
CREATE TABLE IF NOT EXISTS public.employee_hobbies
(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    hobby VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) 
        REFERENCES public.employees(id) ON DELETE CASCADE
);

CREATE INDEX idx_hobbies_employee_id ON public.employee_hobbies(employee_id);

-- ============================================
-- SET OWNERSHIP (adjust as needed)
-- ============================================
ALTER TABLE public.employee_personal_info OWNER TO "user";
ALTER TABLE public.employee_addresses OWNER TO "user";
ALTER TABLE public.employee_work_experience OWNER TO "user";
ALTER TABLE public.work_experience_responsibilities OWNER TO "user";
ALTER TABLE public.work_experience_achievements OWNER TO "user";
ALTER TABLE public.work_experience_technologies OWNER TO "user";
ALTER TABLE public.employee_education OWNER TO "user";
ALTER TABLE public.education_courses OWNER TO "user";
ALTER TABLE public.skill_categories OWNER TO "user";
ALTER TABLE public.employee_technical_skills OWNER TO "user";
ALTER TABLE public.employee_soft_skills OWNER TO "user";
ALTER TABLE public.employee_languages OWNER TO "user";
ALTER TABLE public.employee_certifications OWNER TO "user";
ALTER TABLE public.employee_projects OWNER TO "user";
ALTER TABLE public.project_technologies OWNER TO "user";
ALTER TABLE public.project_achievements OWNER TO "user";
ALTER TABLE public.project_links OWNER TO "user";
ALTER TABLE public.employee_publications OWNER TO "user";
ALTER TABLE public.employee_awards OWNER TO "user";
ALTER TABLE public.employee_volunteering OWNER TO "user";
ALTER TABLE public.volunteering_responsibilities OWNER TO "user";
ALTER TABLE public.employee_additional_info OWNER TO "user";
ALTER TABLE public.employee_hobbies OWNER TO "user";

-- ============================================
-- USEFUL VIEWS
-- ============================================

-- Complete employee profile view
CREATE OR REPLACE VIEW vw_employee_complete_profile AS
SELECT 
    e.id,
    e.first_name,
    e.last_name,
    e.title,
    e.department,
    e.hire_date,
    e.salary,
    e.is_active,
    pi.professional_title,
    pi.email,
    pi.phone,
    pi.linkedin_url,
    pi.github_url,
    pi.professional_summary
FROM public.employees e
LEFT JOIN public.employee_personal_info pi ON e.id = pi.employee_id;

-- Employee skills summary view
CREATE OR REPLACE VIEW vw_employee_skills_summary AS
SELECT 
    e.id as employee_id,
    e.first_name,
    e.last_name,
    COUNT(DISTINCT ts.id) as technical_skills_count,
    COUNT(DISTINCT ss.id) as soft_skills_count,
    COUNT(DISTINCT l.id) as languages_count
FROM public.employees e
LEFT JOIN public.employee_technical_skills ts ON e.id = ts.employee_id
LEFT JOIN public.employee_soft_skills ss ON e.id = ss.employee_id
LEFT JOIN public.employee_languages l ON e.id = l.employee_id
GROUP BY e.id, e.first_name, e.last_name;

-- Employee experience summary view
CREATE OR REPLACE VIEW vw_employee_experience_summary AS
SELECT 
    e.id as employee_id,
    e.first_name,
    e.last_name,
    COUNT(DISTINCT we.id) as jobs_count,
    COUNT(DISTINCT ed.id) as education_count,
    COUNT(DISTINCT c.id) as certifications_count,
    COUNT(DISTINCT p.id) as projects_count
FROM public.employees e
LEFT JOIN public.employee_work_experience we ON e.id = we.employee_id
LEFT JOIN public.employee_education ed ON e.id = ed.employee_id
LEFT JOIN public.employee_certifications c ON e.id = c.employee_id
LEFT JOIN public.employee_projects p ON e.id = p.employee_id
GROUP BY e.id, e.first_name, e.last_name;
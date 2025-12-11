--
-- PostgreSQL database dump
--

\restrict koN9K0am8hs63KTon7Wk8rjrvafQRcRiLa2JEo7p2ymni6g1egFldStgrwI5lH9

-- Dumped from database version 15.15
-- Dumped by pg_dump version 15.15 (Debian 15.15-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: userrole; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public.userrole AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public.userrole OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: education_courses; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.education_courses (
    id integer NOT NULL,
    education_id integer NOT NULL,
    course_name character varying(200) NOT NULL,
    display_order integer DEFAULT 0
);


ALTER TABLE public.education_courses OWNER TO "user";

--
-- Name: education_courses_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.education_courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.education_courses_id_seq OWNER TO "user";

--
-- Name: education_courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.education_courses_id_seq OWNED BY public.education_courses.id;


--
-- Name: employee_additional_info; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_additional_info (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    driving_license character varying(50),
    military_status character varying(100),
    availability character varying(100),
    willing_to_relocate boolean DEFAULT false,
    willing_to_travel boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_additional_info OWNER TO "user";

--
-- Name: employee_additional_info_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_additional_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_additional_info_id_seq OWNER TO "user";

--
-- Name: employee_additional_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_additional_info_id_seq OWNED BY public.employee_additional_info.id;


--
-- Name: employee_addresses; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_addresses (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    address_type character varying(50) DEFAULT 'primary'::character varying,
    country character varying(100),
    city character varying(100),
    street text,
    postal_code character varying(20),
    is_current boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_addresses OWNER TO "user";

--
-- Name: employee_addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_addresses_id_seq OWNER TO "user";

--
-- Name: employee_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_addresses_id_seq OWNED BY public.employee_addresses.id;


--
-- Name: employee_awards; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_awards (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    award_name character varying(200) NOT NULL,
    issuer character varying(200),
    award_date date,
    description text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_awards OWNER TO "user";

--
-- Name: employee_awards_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_awards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_awards_id_seq OWNER TO "user";

--
-- Name: employee_awards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_awards_id_seq OWNED BY public.employee_awards.id;


--
-- Name: employee_certifications; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_certifications (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    certification_name character varying(200) NOT NULL,
    issuing_organization character varying(200),
    issue_date date,
    expiration_date date,
    credential_id character varying(150),
    credential_url character varying(255),
    does_not_expire boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_certifications OWNER TO "user";

--
-- Name: employee_certifications_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_certifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_certifications_id_seq OWNER TO "user";

--
-- Name: employee_certifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_certifications_id_seq OWNED BY public.employee_certifications.id;


--
-- Name: employee_education; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_education (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    institution character varying(200) NOT NULL,
    degree character varying(150),
    field_of_study character varying(150),
    gpa character varying(20),
    start_date date,
    end_date date,
    is_current boolean DEFAULT false,
    thesis text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_education OWNER TO "user";

--
-- Name: employee_education_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_education_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_education_id_seq OWNER TO "user";

--
-- Name: employee_education_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_education_id_seq OWNED BY public.employee_education.id;


--
-- Name: employee_hobbies; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_hobbies (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    hobby character varying(150) NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.employee_hobbies OWNER TO "user";

--
-- Name: employee_hobbies_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_hobbies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_hobbies_id_seq OWNER TO "user";

--
-- Name: employee_hobbies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_hobbies_id_seq OWNED BY public.employee_hobbies.id;


--
-- Name: employee_languages; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_languages (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    language character varying(100) NOT NULL,
    proficiency character varying(50),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_languages OWNER TO "user";

--
-- Name: employee_languages_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_languages_id_seq OWNER TO "user";

--
-- Name: employee_languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_languages_id_seq OWNED BY public.employee_languages.id;


--
-- Name: employee_personal_info; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_personal_info (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    birth_date date,
    gender character varying(20),
    nationality character varying(100),
    email character varying(255),
    phone character varying(50),
    website character varying(255),
    linkedin_url character varying(255),
    github_url character varying(255),
    professional_title character varying(150),
    professional_summary text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_personal_info OWNER TO "user";

--
-- Name: employee_personal_info_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_personal_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_personal_info_id_seq OWNER TO "user";

--
-- Name: employee_personal_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_personal_info_id_seq OWNED BY public.employee_personal_info.id;


--
-- Name: employee_projects; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_projects (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    project_name character varying(200) NOT NULL,
    description text,
    role character varying(150),
    start_date date,
    end_date date,
    is_current boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_projects OWNER TO "user";

--
-- Name: employee_projects_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_projects_id_seq OWNER TO "user";

--
-- Name: employee_projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_projects_id_seq OWNED BY public.employee_projects.id;


--
-- Name: employee_publications; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_publications (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    title character varying(300) NOT NULL,
    publication_type character varying(100),
    publisher character varying(200),
    publication_date date,
    url character varying(255),
    description text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_publications OWNER TO "user";

--
-- Name: employee_publications_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_publications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_publications_id_seq OWNER TO "user";

--
-- Name: employee_publications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_publications_id_seq OWNED BY public.employee_publications.id;


--
-- Name: employee_soft_skills; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_soft_skills (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    skill_name character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.employee_soft_skills OWNER TO "user";

--
-- Name: employee_soft_skills_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_soft_skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_soft_skills_id_seq OWNER TO "user";

--
-- Name: employee_soft_skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_soft_skills_id_seq OWNED BY public.employee_soft_skills.id;


--
-- Name: employee_technical_skills; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_technical_skills (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    skill_category_id integer,
    skill_name character varying(150) NOT NULL,
    proficiency_level character varying(50),
    years_of_experience numeric(4,1),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_technical_skills OWNER TO "user";

--
-- Name: employee_technical_skills_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_technical_skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_technical_skills_id_seq OWNER TO "user";

--
-- Name: employee_technical_skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_technical_skills_id_seq OWNED BY public.employee_technical_skills.id;


--
-- Name: employee_volunteering; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_volunteering (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    role character varying(150) NOT NULL,
    organization character varying(200) NOT NULL,
    start_date date,
    end_date date,
    is_current boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_volunteering OWNER TO "user";

--
-- Name: employee_volunteering_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_volunteering_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_volunteering_id_seq OWNER TO "user";

--
-- Name: employee_volunteering_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_volunteering_id_seq OWNED BY public.employee_volunteering.id;


--
-- Name: employee_work_experience; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employee_work_experience (
    id integer NOT NULL,
    employee_id integer NOT NULL,
    job_title character varying(150) NOT NULL,
    company character varying(200) NOT NULL,
    employment_type character varying(50),
    country character varying(100),
    city character varying(100),
    start_date date NOT NULL,
    end_date date,
    is_current boolean DEFAULT false,
    description text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employee_work_experience OWNER TO "user";

--
-- Name: employee_work_experience_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employee_work_experience_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_work_experience_id_seq OWNER TO "user";

--
-- Name: employee_work_experience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employee_work_experience_id_seq OWNED BY public.employee_work_experience.id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    title character varying(100),
    department character varying(100),
    hire_date timestamp without time zone,
    salary integer,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.employees OWNER TO "user";

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_id_seq OWNER TO "user";

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: job_application_notes; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.job_application_notes (
    id integer NOT NULL,
    application_id integer NOT NULL,
    author_id integer NOT NULL,
    note text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.job_application_notes OWNER TO "user";

--
-- Name: job_application_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.job_application_notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_application_notes_id_seq OWNER TO "user";

--
-- Name: job_application_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.job_application_notes_id_seq OWNED BY public.job_application_notes.id;


--
-- Name: job_applications; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.job_applications (
    id integer NOT NULL,
    job_posting_id integer NOT NULL,
    candidate_name character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(50),
    resume_url character varying(500),
    cover_letter text,
    portfolio_url character varying(500),
    linkedin_url character varying(500),
    source character varying(100),
    status character varying(50) DEFAULT 'New'::character varying NOT NULL,
    applied_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.job_applications OWNER TO "user";

--
-- Name: job_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.job_applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_applications_id_seq OWNER TO "user";

--
-- Name: job_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.job_applications_id_seq OWNED BY public.job_applications.id;


--
-- Name: job_posting_activities; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.job_posting_activities (
    id integer NOT NULL,
    job_posting_id integer NOT NULL,
    actor_id integer,
    action_type character varying(100) NOT NULL,
    details text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.job_posting_activities OWNER TO "user";

--
-- Name: job_posting_activities_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.job_posting_activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_posting_activities_id_seq OWNER TO "user";

--
-- Name: job_posting_activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.job_posting_activities_id_seq OWNED BY public.job_posting_activities.id;


--
-- Name: job_posting_daily_stats; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.job_posting_daily_stats (
    id integer NOT NULL,
    job_posting_id integer NOT NULL,
    date date NOT NULL,
    views_count integer DEFAULT 0,
    applications_count integer DEFAULT 0
);


ALTER TABLE public.job_posting_daily_stats OWNER TO "user";

--
-- Name: job_posting_daily_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.job_posting_daily_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_posting_daily_stats_id_seq OWNER TO "user";

--
-- Name: job_posting_daily_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.job_posting_daily_stats_id_seq OWNED BY public.job_posting_daily_stats.id;


--
-- Name: job_posting_notes; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.job_posting_notes (
    id integer NOT NULL,
    job_posting_id integer NOT NULL,
    author_id integer NOT NULL,
    note text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.job_posting_notes OWNER TO "user";

--
-- Name: job_posting_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.job_posting_notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_posting_notes_id_seq OWNER TO "user";

--
-- Name: job_posting_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.job_posting_notes_id_seq OWNED BY public.job_posting_notes.id;


--
-- Name: job_postings; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.job_postings (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    department character varying(100),
    location character varying(100),
    work_type character varying(50),
    status character varying(50) DEFAULT 'Draft'::character varying NOT NULL,
    description text,
    responsibilities text[],
    requirements text[],
    benefits text[],
    salary_range_min integer,
    salary_range_max integer,
    salary_currency character varying(10) DEFAULT 'USD'::character varying,
    posting_date timestamp with time zone DEFAULT now(),
    expiration_date timestamp with time zone,
    created_by integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.job_postings OWNER TO "user";

--
-- Name: job_postings_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.job_postings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_postings_id_seq OWNER TO "user";

--
-- Name: job_postings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.job_postings_id_seq OWNED BY public.job_postings.id;


--
-- Name: project_achievements; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.project_achievements (
    id integer NOT NULL,
    project_id integer NOT NULL,
    achievement text NOT NULL,
    display_order integer DEFAULT 0
);


ALTER TABLE public.project_achievements OWNER TO "user";

--
-- Name: project_achievements_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.project_achievements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_achievements_id_seq OWNER TO "user";

--
-- Name: project_achievements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.project_achievements_id_seq OWNED BY public.project_achievements.id;


--
-- Name: project_links; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.project_links (
    id integer NOT NULL,
    project_id integer NOT NULL,
    link_url character varying(255) NOT NULL,
    link_type character varying(50)
);


ALTER TABLE public.project_links OWNER TO "user";

--
-- Name: project_links_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.project_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_links_id_seq OWNER TO "user";

--
-- Name: project_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.project_links_id_seq OWNED BY public.project_links.id;


--
-- Name: project_technologies; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.project_technologies (
    id integer NOT NULL,
    project_id integer NOT NULL,
    technology character varying(100) NOT NULL
);


ALTER TABLE public.project_technologies OWNER TO "user";

--
-- Name: project_technologies_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.project_technologies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_technologies_id_seq OWNER TO "user";

--
-- Name: project_technologies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.project_technologies_id_seq OWNED BY public.project_technologies.id;


--
-- Name: skill_categories; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.skill_categories (
    id integer NOT NULL,
    category_name character varying(100) NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.skill_categories OWNER TO "user";

--
-- Name: skill_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.skill_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.skill_categories_id_seq OWNER TO "user";

--
-- Name: skill_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.skill_categories_id_seq OWNED BY public.skill_categories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying NOT NULL,
    hashed_password character varying NOT NULL,
    full_name character varying,
    is_active boolean DEFAULT true,
    role character varying DEFAULT 'user'::character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: volunteering_responsibilities; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.volunteering_responsibilities (
    id integer NOT NULL,
    volunteering_id integer NOT NULL,
    responsibility text NOT NULL,
    display_order integer DEFAULT 0
);


ALTER TABLE public.volunteering_responsibilities OWNER TO "user";

--
-- Name: volunteering_responsibilities_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.volunteering_responsibilities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.volunteering_responsibilities_id_seq OWNER TO "user";

--
-- Name: volunteering_responsibilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.volunteering_responsibilities_id_seq OWNED BY public.volunteering_responsibilities.id;


--
-- Name: work_experience_achievements; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.work_experience_achievements (
    id integer NOT NULL,
    work_experience_id integer NOT NULL,
    achievement text NOT NULL,
    display_order integer DEFAULT 0
);


ALTER TABLE public.work_experience_achievements OWNER TO "user";

--
-- Name: work_experience_achievements_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.work_experience_achievements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.work_experience_achievements_id_seq OWNER TO "user";

--
-- Name: work_experience_achievements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.work_experience_achievements_id_seq OWNED BY public.work_experience_achievements.id;


--
-- Name: work_experience_responsibilities; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.work_experience_responsibilities (
    id integer NOT NULL,
    work_experience_id integer NOT NULL,
    responsibility text NOT NULL,
    display_order integer DEFAULT 0
);


ALTER TABLE public.work_experience_responsibilities OWNER TO "user";

--
-- Name: work_experience_responsibilities_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.work_experience_responsibilities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.work_experience_responsibilities_id_seq OWNER TO "user";

--
-- Name: work_experience_responsibilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.work_experience_responsibilities_id_seq OWNED BY public.work_experience_responsibilities.id;


--
-- Name: work_experience_technologies; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.work_experience_technologies (
    id integer NOT NULL,
    work_experience_id integer NOT NULL,
    technology character varying(100) NOT NULL
);


ALTER TABLE public.work_experience_technologies OWNER TO "user";

--
-- Name: work_experience_technologies_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.work_experience_technologies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.work_experience_technologies_id_seq OWNER TO "user";

--
-- Name: work_experience_technologies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.work_experience_technologies_id_seq OWNED BY public.work_experience_technologies.id;


--
-- Name: education_courses id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.education_courses ALTER COLUMN id SET DEFAULT nextval('public.education_courses_id_seq'::regclass);


--
-- Name: employee_additional_info id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_additional_info ALTER COLUMN id SET DEFAULT nextval('public.employee_additional_info_id_seq'::regclass);


--
-- Name: employee_addresses id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_addresses ALTER COLUMN id SET DEFAULT nextval('public.employee_addresses_id_seq'::regclass);


--
-- Name: employee_awards id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_awards ALTER COLUMN id SET DEFAULT nextval('public.employee_awards_id_seq'::regclass);


--
-- Name: employee_certifications id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_certifications ALTER COLUMN id SET DEFAULT nextval('public.employee_certifications_id_seq'::regclass);


--
-- Name: employee_education id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_education ALTER COLUMN id SET DEFAULT nextval('public.employee_education_id_seq'::regclass);


--
-- Name: employee_hobbies id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_hobbies ALTER COLUMN id SET DEFAULT nextval('public.employee_hobbies_id_seq'::regclass);


--
-- Name: employee_languages id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_languages ALTER COLUMN id SET DEFAULT nextval('public.employee_languages_id_seq'::regclass);


--
-- Name: employee_personal_info id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_personal_info ALTER COLUMN id SET DEFAULT nextval('public.employee_personal_info_id_seq'::regclass);


--
-- Name: employee_projects id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_projects ALTER COLUMN id SET DEFAULT nextval('public.employee_projects_id_seq'::regclass);


--
-- Name: employee_publications id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_publications ALTER COLUMN id SET DEFAULT nextval('public.employee_publications_id_seq'::regclass);


--
-- Name: employee_soft_skills id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_soft_skills ALTER COLUMN id SET DEFAULT nextval('public.employee_soft_skills_id_seq'::regclass);


--
-- Name: employee_technical_skills id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_technical_skills ALTER COLUMN id SET DEFAULT nextval('public.employee_technical_skills_id_seq'::regclass);


--
-- Name: employee_volunteering id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_volunteering ALTER COLUMN id SET DEFAULT nextval('public.employee_volunteering_id_seq'::regclass);


--
-- Name: employee_work_experience id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_work_experience ALTER COLUMN id SET DEFAULT nextval('public.employee_work_experience_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: job_application_notes id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_application_notes ALTER COLUMN id SET DEFAULT nextval('public.job_application_notes_id_seq'::regclass);


--
-- Name: job_applications id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_applications ALTER COLUMN id SET DEFAULT nextval('public.job_applications_id_seq'::regclass);


--
-- Name: job_posting_activities id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_activities ALTER COLUMN id SET DEFAULT nextval('public.job_posting_activities_id_seq'::regclass);


--
-- Name: job_posting_daily_stats id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_daily_stats ALTER COLUMN id SET DEFAULT nextval('public.job_posting_daily_stats_id_seq'::regclass);


--
-- Name: job_posting_notes id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_notes ALTER COLUMN id SET DEFAULT nextval('public.job_posting_notes_id_seq'::regclass);


--
-- Name: job_postings id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_postings ALTER COLUMN id SET DEFAULT nextval('public.job_postings_id_seq'::regclass);


--
-- Name: project_achievements id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.project_achievements ALTER COLUMN id SET DEFAULT nextval('public.project_achievements_id_seq'::regclass);


--
-- Name: project_links id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.project_links ALTER COLUMN id SET DEFAULT nextval('public.project_links_id_seq'::regclass);


--
-- Name: project_technologies id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.project_technologies ALTER COLUMN id SET DEFAULT nextval('public.project_technologies_id_seq'::regclass);


--
-- Name: skill_categories id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.skill_categories ALTER COLUMN id SET DEFAULT nextval('public.skill_categories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: volunteering_responsibilities id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.volunteering_responsibilities ALTER COLUMN id SET DEFAULT nextval('public.volunteering_responsibilities_id_seq'::regclass);


--
-- Name: work_experience_achievements id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.work_experience_achievements ALTER COLUMN id SET DEFAULT nextval('public.work_experience_achievements_id_seq'::regclass);


--
-- Name: work_experience_responsibilities id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.work_experience_responsibilities ALTER COLUMN id SET DEFAULT nextval('public.work_experience_responsibilities_id_seq'::regclass);


--
-- Name: work_experience_technologies id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.work_experience_technologies ALTER COLUMN id SET DEFAULT nextval('public.work_experience_technologies_id_seq'::regclass);


--
-- Data for Name: education_courses; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.education_courses (id, education_id, course_name, display_order) FROM stdin;
1	1	Data Structures and Algorithms	1
2	1	Operating Systems	2
3	1	Database Systems	3
4	1	Computer Networks	4
5	1	Software Engineering	5
6	2	Distributed Systems	1
7	2	Cloud Computing	2
8	2	Machine Learning	3
9	2	Advanced Algorithms	4
10	4	Strategic Management	1
11	4	Financial Accounting	2
12	4	Marketing Management	3
13	4	Operations Management	4
14	8	Machine Learning	1
15	8	Statistical Learning Theory	2
16	8	Big Data Analytics	3
17	8	Natural Language Processing	4
\.


--
-- Data for Name: employee_additional_info; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_additional_info (id, employee_id, driving_license, military_status, availability, willing_to_relocate, willing_to_travel, created_at, updated_at) FROM stdin;
1	1	Class C	Not Applicable	Currently Employed	f	t	2025-12-08 09:51:41.068329+00	\N
2	2	Class C	Not Applicable	Currently Employed	t	t	2025-12-08 09:51:41.068329+00	\N
3	3	Class C	Not Applicable	Currently Employed	f	f	2025-12-08 09:51:41.068329+00	\N
4	4	Class C	Completed	Currently Employed	t	t	2025-12-08 09:51:41.068329+00	\N
5	5	Class C	Not Applicable	Currently Employed	f	t	2025-12-08 09:51:41.068329+00	\N
6	6	Class C	Not Applicable	Available Immediately	t	t	2025-12-08 09:51:41.068329+00	\N
7	7	Class C	Not Applicable	Currently Employed	f	f	2025-12-08 09:51:41.068329+00	\N
8	8	Class B	Not Applicable	Currently Employed	t	t	2025-12-08 09:51:41.068329+00	\N
\.


--
-- Data for Name: employee_addresses; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_addresses (id, employee_id, address_type, country, city, street, postal_code, is_current, created_at, updated_at) FROM stdin;
9	1	primary	United States	San Francisco	123 Market Street, Apt 4B	94102	t	2025-12-08 09:51:40.906927+00	\N
10	2	primary	United States	Seattle	456 Pine Avenue	98101	t	2025-12-08 09:51:40.906927+00	\N
11	3	primary	United States	Austin	789 Congress Ave, Unit 12	78701	t	2025-12-08 09:51:40.906927+00	\N
12	4	primary	United States	New York	321 Broadway, Floor 5	10007	t	2025-12-08 09:51:40.906927+00	\N
13	5	primary	United States	Boston	654 Commonwealth Ave	02215	t	2025-12-08 09:51:40.906927+00	\N
14	6	primary	United States	Chicago	987 Michigan Ave	60611	f	2025-12-08 09:51:40.906927+00	\N
15	7	primary	United States	Los Angeles	147 Sunset Blvd	90028	t	2025-12-08 09:51:40.906927+00	\N
16	8	primary	United States	Denver	258 16th Street	80202	t	2025-12-08 09:51:40.906927+00	\N
\.


--
-- Data for Name: employee_awards; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_awards (id, employee_id, award_name, issuer, award_date, description, created_at, updated_at) FROM stdin;
1	1	Engineer of the Year	Current Company	2022-12-15	Recognized for outstanding technical contributions and leadership	2025-12-08 09:51:41.053208+00	\N
2	1	Hackathon Winner	TechCorp Annual Hackathon	2018-11-20	First place for building innovative payment processing solution	2025-12-08 09:51:41.053208+00	\N
3	2	Product Excellence Award	Current Company	2022-12-15	Awarded for successful launch of mobile application	2025-12-08 09:51:41.053208+00	\N
4	3	Best Design Portfolio	Design Conference 2022	2022-06-10	Recognition for exceptional UX/UI work	2025-12-08 09:51:41.053208+00	\N
5	4	Best Paper Award	ICML 2021	2021-07-18	Received best paper award at International Conference on Machine Learning	2025-12-08 09:51:41.053208+00	\N
6	4	Outstanding Graduate Student	MIT	2018-05-20	Awarded for exceptional academic performance and research	2025-12-08 09:51:41.053208+00	\N
7	5	Innovation Award	Current Company	2021-12-10	Recognized for implementing cost-saving cloud infrastructure	2025-12-08 09:51:41.053208+00	\N
8	7	HR Leader of the Year	HR Excellence Awards	2020-10-15	Recognized for innovative HR programs and employee engagement initiatives	2025-12-08 09:51:41.053208+00	\N
\.


--
-- Data for Name: employee_certifications; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_certifications (id, employee_id, certification_name, issuing_organization, issue_date, expiration_date, credential_id, credential_url, does_not_expire, created_at, updated_at) FROM stdin;
1	1	AWS Certified Solutions Architect - Professional	Amazon Web Services	2022-06-15	2025-06-15	AWS-PSA-12345	https://aws.amazon.com/verification/12345	f	2025-12-08 09:51:41.015051+00	\N
2	1	Certified Kubernetes Administrator	Cloud Native Computing Foundation	2021-09-20	2024-09-20	CKA-67890	https://cncf.io/certification/cka/67890	f	2025-12-08 09:51:41.015051+00	\N
3	2	Certified Scrum Product Owner	Scrum Alliance	2020-03-10	\N	CSPO-54321	https://scrumalliance.org/54321	t	2025-12-08 09:51:41.015051+00	\N
4	2	Product Management Certificate	Product School	2019-11-05	\N	PM-98765	\N	t	2025-12-08 09:51:41.015051+00	\N
5	4	TensorFlow Developer Certificate	Google	2021-04-20	2024-04-20	TF-11111	https://developers.google.com/certification/11111	f	2025-12-08 09:51:41.015051+00	\N
6	4	AWS Certified Machine Learning - Specialty	Amazon Web Services	2022-08-15	2025-08-15	AWS-ML-22222	https://aws.amazon.com/verification/22222	f	2025-12-08 09:51:41.015051+00	\N
7	5	AWS Certified DevOps Engineer - Professional	Amazon Web Services	2021-07-10	2024-07-10	AWS-DOP-33333	https://aws.amazon.com/verification/33333	f	2025-12-08 09:51:41.015051+00	\N
8	5	Certified Kubernetes Security Specialist	Cloud Native Computing Foundation	2022-10-05	2025-10-05	CKS-44444	https://cncf.io/certification/cks/44444	f	2025-12-08 09:51:41.015051+00	\N
9	7	SHRM Senior Certified Professional	Society for Human Resource Management	2019-05-15	\N	SHRM-SCP-55555	https://shrm.org/certification/55555	t	2025-12-08 09:51:41.015051+00	\N
10	7	Professional in Human Resources	HR Certification Institute	2015-08-20	\N	PHR-66666	\N	t	2025-12-08 09:51:41.015051+00	\N
\.


--
-- Data for Name: employee_education; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_education (id, employee_id, institution, degree, field_of_study, gpa, start_date, end_date, is_current, thesis, created_at, updated_at) FROM stdin;
1	1	Stanford University	Bachelor of Science	Computer Science	3.85	2011-09-01	2015-06-15	f	\N	2025-12-08 09:51:40.963103+00	\N
2	1	Stanford University	Master of Science	Computer Science	3.92	2015-09-01	2017-06-15	f	Optimization Techniques for Distributed Systems	2025-12-08 09:51:40.963103+00	\N
3	2	University of Toronto	Bachelor of Commerce	Business Administration	3.75	2010-09-01	2014-06-30	f	\N	2025-12-08 09:51:40.963103+00	\N
4	2	Harvard Business School	Master of Business Administration	MBA	3.88	2015-09-01	2017-05-25	f	\N	2025-12-08 09:51:40.963103+00	\N
5	3	Universidad Nacional Autónoma de México	Bachelor of Fine Arts	Graphic Design	3.70	2013-08-15	2017-06-20	f	\N	2025-12-08 09:51:40.963103+00	\N
6	3	Rhode Island School of Design	Certificate	UX/UI Design	\N	2018-01-10	2018-12-20	f	\N	2025-12-08 09:51:40.963103+00	\N
7	4	Indian Institute of Technology Delhi	Bachelor of Technology	Computer Science	3.95	2012-07-01	2016-05-30	f	\N	2025-12-08 09:51:40.963103+00	\N
8	4	MIT	Master of Science	Data Science	4.00	2016-09-01	2018-05-20	f	Deep Learning Approaches for Natural Language Processing	2025-12-08 09:51:40.963103+00	\N
9	4	MIT	Doctor of Philosophy	Machine Learning	3.98	2018-09-01	2022-05-15	f	Novel Architectures for Transfer Learning in Computer Vision	2025-12-08 09:51:40.963103+00	\N
10	5	University of Manchester	Bachelor of Science	Information Technology	3.65	2010-09-01	2014-06-25	f	\N	2025-12-08 09:51:40.963103+00	\N
11	6	University of Illinois	Bachelor of Science	Marketing	3.60	2007-08-20	2011-05-15	f	\N	2025-12-08 09:51:40.963103+00	\N
12	7	UCLA	Bachelor of Arts	Psychology	3.72	2005-09-01	2009-06-10	f	\N	2025-12-08 09:51:40.963103+00	\N
13	7	Cornell University	Master of Science	Human Resources Management	3.85	2012-09-01	2014-05-20	f	\N	2025-12-08 09:51:40.963103+00	\N
14	8	Universidad Politécnica de Madrid	Bachelor of Science	Software Engineering	3.80	2014-09-01	2018-06-30	f	\N	2025-12-08 09:51:40.963103+00	\N
\.


--
-- Data for Name: employee_hobbies; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_hobbies (id, employee_id, hobby, created_at) FROM stdin;
1	1	Photography	2025-12-08 09:51:41.07463+00
2	1	Hiking	2025-12-08 09:51:41.07463+00
3	1	Reading Tech Blogs	2025-12-08 09:51:41.07463+00
4	1	Playing Guitar	2025-12-08 09:51:41.07463+00
5	2	Running Marathons	2025-12-08 09:51:41.07463+00
6	2	Chess	2025-12-08 09:51:41.07463+00
7	2	Reading Business Books	2025-12-08 09:51:41.07463+00
8	3	Painting	2025-12-08 09:51:41.07463+00
9	3	Yoga	2025-12-08 09:51:41.07463+00
10	3	Traveling	2025-12-08 09:51:41.07463+00
11	3	Cooking	2025-12-08 09:51:41.07463+00
12	4	Reading Research Papers	2025-12-08 09:51:41.07463+00
13	4	Cricket	2025-12-08 09:51:41.07463+00
14	4	Playing Piano	2025-12-08 09:51:41.07463+00
15	4	Meditation	2025-12-08 09:51:41.07463+00
16	5	Rock Climbing	2025-12-08 09:51:41.07463+00
17	5	Home Automation Projects	2025-12-08 09:51:41.07463+00
18	5	Cycling	2025-12-08 09:51:41.07463+00
19	6	Golf	2025-12-08 09:51:41.07463+00
20	6	Wine Tasting	2025-12-08 09:51:41.07463+00
21	6	Sailing	2025-12-08 09:51:41.07463+00
22	7	Gardening	2025-12-08 09:51:41.07463+00
23	7	Book Club	2025-12-08 09:51:41.07463+00
24	7	Volunteering	2025-12-08 09:51:41.07463+00
25	8	Soccer	2025-12-08 09:51:41.07463+00
26	8	Gaming	2025-12-08 09:51:41.07463+00
27	8	Photography	2025-12-08 09:51:41.07463+00
28	8	Learning New Languages	2025-12-08 09:51:41.07463+00
\.


--
-- Data for Name: employee_languages; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_languages (id, employee_id, language, proficiency, created_at, updated_at) FROM stdin;
1	1	English	Native	2025-12-08 09:51:41.009484+00	\N
2	1	Spanish	Intermediate	2025-12-08 09:51:41.009484+00	\N
3	2	English	Fluent	2025-12-08 09:51:41.009484+00	\N
4	2	Mandarin	Native	2025-12-08 09:51:41.009484+00	\N
5	2	French	Beginner	2025-12-08 09:51:41.009484+00	\N
6	3	Spanish	Native	2025-12-08 09:51:41.009484+00	\N
7	3	English	Fluent	2025-12-08 09:51:41.009484+00	\N
8	3	Portuguese	Intermediate	2025-12-08 09:51:41.009484+00	\N
9	4	English	Fluent	2025-12-08 09:51:41.009484+00	\N
10	4	Hindi	Native	2025-12-08 09:51:41.009484+00	\N
11	4	German	Intermediate	2025-12-08 09:51:41.009484+00	\N
12	5	English	Native	2025-12-08 09:51:41.009484+00	\N
13	5	French	Advanced	2025-12-08 09:51:41.009484+00	\N
14	6	English	Native	2025-12-08 09:51:41.009484+00	\N
15	7	English	Native	2025-12-08 09:51:41.009484+00	\N
16	7	Spanish	Beginner	2025-12-08 09:51:41.009484+00	\N
17	8	Spanish	Native	2025-12-08 09:51:41.009484+00	\N
18	8	English	Fluent	2025-12-08 09:51:41.009484+00	\N
19	8	Italian	Intermediate	2025-12-08 09:51:41.009484+00	\N
\.


--
-- Data for Name: employee_personal_info; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_personal_info (id, employee_id, birth_date, gender, nationality, email, phone, website, linkedin_url, github_url, professional_title, professional_summary, created_at, updated_at) FROM stdin;
9	1	1990-05-12	Female	American	sarah.johnson@email.com	+1-555-0101	https://sarahjohnson.dev	https://linkedin.com/in/sarahjohnson	https://github.com/sarahjdev	Senior Software Engineer	Passionate software engineer with 8+ years of experience in building scalable web applications. Specialized in React, Node.js, and cloud architecture. Strong advocate for clean code and agile methodologies.	2025-12-08 09:51:40.902273+00	\N
10	2	1988-11-23	Male	Canadian	michael.chen@email.com	+1-555-0102	https://michaelchen.com	https://linkedin.com/in/michaelchen	\N	Product Manager	Results-driven product manager with a proven track record of launching successful B2B and B2C products. Expert in product strategy, roadmap planning, and cross-functional team leadership.	2025-12-08 09:51:40.902273+00	\N
11	3	1993-08-07	Female	Mexican	emily.rodriguez@email.com	+1-555-0103	https://emilydesigns.portfolio	https://linkedin.com/in/emilyrodriguez	\N	UX/UI Designer	Creative designer with a passion for creating intuitive and beautiful user experiences. Experienced in user research, wireframing, prototyping, and design systems.	2025-12-08 09:51:40.902273+00	\N
12	4	1991-02-18	Male	Indian	david.kumar@email.com	+1-555-0104	\N	https://linkedin.com/in/davidkumar	https://github.com/dkumar	Data Scientist	Data scientist specializing in machine learning and predictive analytics. Expert in Python, R, and statistical modeling. Published researcher with multiple papers in top-tier conferences.	2025-12-08 09:51:40.902273+00	\N
13	5	1989-12-30	Female	British	jennifer.williams@email.com	+1-555-0105	\N	https://linkedin.com/in/jenniferwilliams	https://github.com/jwilliams	DevOps Engineer	DevOps engineer with extensive experience in cloud infrastructure, CI/CD pipelines, and container orchestration. AWS and Kubernetes certified professional.	2025-12-08 09:51:40.902273+00	\N
14	6	1987-06-15	Male	American	robert.anderson@email.com	+1-555-0106	\N	https://linkedin.com/in/robertanderson	\N	Marketing Manager	Strategic marketing professional with 10+ years of experience in digital marketing, brand development, and campaign management.	2025-12-08 09:51:40.902273+00	\N
15	7	1985-04-22	Female	American	lisa.thompson@email.com	+1-555-0107	\N	https://linkedin.com/in/lisathompson	\N	HR Director	Experienced HR leader specializing in talent acquisition, employee engagement, and organizational development. SHRM-SCP certified.	2025-12-08 09:51:40.902273+00	\N
16	8	1994-09-11	Male	Spanish	james.martinez@email.com	+1-555-0108	https://jmartinez.dev	https://linkedin.com/in/jamesmartinez	https://github.com/jmartinez	Full Stack Developer	Full stack developer proficient in modern web technologies. Experienced in building responsive web applications from concept to deployment.	2025-12-08 09:51:40.902273+00	\N
\.


--
-- Data for Name: employee_projects; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_projects (id, employee_id, project_name, description, role, start_date, end_date, is_current, created_at, updated_at) FROM stdin;
1	1	E-commerce Platform Redesign	Led complete architectural redesign of e-commerce platform serving 5M+ users. Implemented microservices architecture with event-driven design.	Technical Lead	2022-01-15	2023-06-30	f	2025-12-08 09:51:41.023389+00	\N
2	1	Real-time Analytics Dashboard	Built real-time analytics dashboard processing millions of events per second using Kafka and Redis.	Senior Engineer	2021-03-01	2021-10-15	f	2025-12-08 09:51:41.023389+00	\N
3	1	Open Source Contribution - React Performance Tools	Contributing to open-source project for React performance monitoring and optimization.	Maintainer	2020-06-01	\N	t	2025-12-08 09:51:41.023389+00	\N
4	2	Mobile App Launch	Led product strategy and launch of mobile application, achieving 100K downloads in first month.	Product Lead	2021-09-01	2022-03-30	f	2025-12-08 09:51:41.023389+00	\N
5	2	B2B SaaS Platform	Managing product roadmap for enterprise SaaS platform with $10M ARR.	Product Manager	2022-04-01	\N	t	2025-12-08 09:51:41.023389+00	\N
6	3	Design System Implementation	Created comprehensive design system adopted across 15+ products, reducing design time by 40%.	Lead Designer	2021-06-01	2022-02-28	f	2025-12-08 09:51:41.023389+00	\N
7	3	Mobile App Redesign	Redesigned mobile application resulting in 35% increase in user engagement.	UX Designer	2022-03-01	2022-09-15	f	2025-12-08 09:51:41.023389+00	\N
8	4	Customer Churn Prediction Model	Developed ML model predicting customer churn with 92% accuracy, saving $5M annually.	Data Scientist	2021-11-01	2022-08-30	f	2025-12-08 09:51:41.023389+00	\N
9	4	Recommendation Engine	Building personalized recommendation system using collaborative filtering and deep learning.	ML Engineer	2023-01-15	\N	t	2025-12-08 09:51:41.023389+00	\N
10	5	Cloud Migration Project	Led migration of on-premise infrastructure to AWS, reducing costs by 35%.	DevOps Lead	2020-05-01	2021-03-30	f	2025-12-08 09:51:41.023389+00	\N
11	5	CI/CD Pipeline Automation	Implementing automated CI/CD pipelines across 50+ microservices.	DevOps Engineer	2021-04-01	\N	t	2025-12-08 09:51:41.023389+00	\N
12	8	Social Media Dashboard	Built full-stack social media analytics dashboard with real-time data visualization.	Full Stack Developer	2022-10-01	2023-04-15	f	2025-12-08 09:51:41.023389+00	\N
\.


--
-- Data for Name: employee_publications; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_publications (id, employee_id, title, publication_type, publisher, publication_date, url, description, created_at, updated_at) FROM stdin;
1	4	Transfer Learning Techniques for Computer Vision Applications	Conference Paper	International Conference on Machine Learning (ICML)	2021-07-15	https://proceedings.mlr.press/v139/kumar21a.html	Novel approach to transfer learning achieving state-of-the-art results on ImageNet	2025-12-08 09:51:41.047623+00	\N
2	4	Deep Learning for Natural Language Processing: A Comprehensive Survey	Journal Article	Journal of Artificial Intelligence Research	2020-03-20	https://jair.org/index.php/jair/article/view/12345	Comprehensive survey of deep learning methods in NLP	2025-12-08 09:51:41.047623+00	\N
3	4	Practical Machine Learning with Python	Book Chapter	OReilly Media	2022-11-10	https://oreilly.com/library/view/practical-ml/9781234567890	Contributing author for chapters on neural networks and optimization	2025-12-08 09:51:41.047623+00	\N
4	1	Microservices Architecture Best Practices	Blog Post	Medium Engineering Blog	2022-05-15	https://medium.com/engineering/microservices-best-practices	Article on designing scalable microservices	2025-12-08 09:51:41.047623+00	\N
5	2	Product Management in the Age of AI	Article	Product Coalition	2023-02-28	https://productcoalition.com/pm-ai-age	Insights on managing AI-powered products	2025-12-08 09:51:41.047623+00	\N
\.


--
-- Data for Name: employee_soft_skills; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_soft_skills (id, employee_id, skill_name, created_at) FROM stdin;
1	1	Leadership	2025-12-08 09:51:41.003856+00
2	1	Problem Solving	2025-12-08 09:51:41.003856+00
3	1	Communication	2025-12-08 09:51:41.003856+00
4	1	Team Collaboration	2025-12-08 09:51:41.003856+00
5	1	Mentoring	2025-12-08 09:51:41.003856+00
6	2	Strategic Thinking	2025-12-08 09:51:41.003856+00
7	2	Communication	2025-12-08 09:51:41.003856+00
8	2	Stakeholder Management	2025-12-08 09:51:41.003856+00
9	2	Decision Making	2025-12-08 09:51:41.003856+00
10	2	Leadership	2025-12-08 09:51:41.003856+00
11	3	Creativity	2025-12-08 09:51:41.003856+00
12	3	Empathy	2025-12-08 09:51:41.003856+00
13	3	Communication	2025-12-08 09:51:41.003856+00
14	3	Collaboration	2025-12-08 09:51:41.003856+00
15	3	Attention to Detail	2025-12-08 09:51:41.003856+00
16	4	Analytical Thinking	2025-12-08 09:51:41.003856+00
17	4	Problem Solving	2025-12-08 09:51:41.003856+00
18	4	Communication	2025-12-08 09:51:41.003856+00
19	4	Research	2025-12-08 09:51:41.003856+00
20	4	Presentation	2025-12-08 09:51:41.003856+00
21	5	Problem Solving	2025-12-08 09:51:41.003856+00
22	5	Communication	2025-12-08 09:51:41.003856+00
23	5	Automation Mindset	2025-12-08 09:51:41.003856+00
24	5	Troubleshooting	2025-12-08 09:51:41.003856+00
25	5	Team Collaboration	2025-12-08 09:51:41.003856+00
26	6	Creativity	2025-12-08 09:51:41.003856+00
27	6	Communication	2025-12-08 09:51:41.003856+00
28	6	Project Management	2025-12-08 09:51:41.003856+00
29	6	Strategic Planning	2025-12-08 09:51:41.003856+00
30	7	Leadership	2025-12-08 09:51:41.003856+00
31	7	Communication	2025-12-08 09:51:41.003856+00
32	7	Conflict Resolution	2025-12-08 09:51:41.003856+00
33	7	Empathy	2025-12-08 09:51:41.003856+00
34	7	Negotiation	2025-12-08 09:51:41.003856+00
35	8	Problem Solving	2025-12-08 09:51:41.003856+00
36	8	Communication	2025-12-08 09:51:41.003856+00
37	8	Adaptability	2025-12-08 09:51:41.003856+00
38	8	Team Collaboration	2025-12-08 09:51:41.003856+00
\.


--
-- Data for Name: employee_technical_skills; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_technical_skills (id, employee_id, skill_category_id, skill_name, proficiency_level, years_of_experience, created_at, updated_at) FROM stdin;
1	1	1	JavaScript	Expert	8.0	2025-12-08 09:51:40.974742+00	\N
2	1	1	TypeScript	Advanced	5.0	2025-12-08 09:51:40.974742+00	\N
3	1	1	Python	Advanced	6.0	2025-12-08 09:51:40.974742+00	\N
4	1	2	React	Expert	7.0	2025-12-08 09:51:40.974742+00	\N
5	1	2	Node.js	Expert	7.0	2025-12-08 09:51:40.974742+00	\N
6	1	2	Express.js	Advanced	6.0	2025-12-08 09:51:40.974742+00	\N
7	1	3	PostgreSQL	Advanced	6.0	2025-12-08 09:51:40.974742+00	\N
8	1	3	MongoDB	Advanced	5.0	2025-12-08 09:51:40.974742+00	\N
9	1	3	Redis	Intermediate	4.0	2025-12-08 09:51:40.974742+00	\N
10	1	4	Docker	Advanced	5.0	2025-12-08 09:51:40.974742+00	\N
11	1	4	Kubernetes	Advanced	4.0	2025-12-08 09:51:40.974742+00	\N
12	1	4	AWS	Advanced	5.0	2025-12-08 09:51:40.974742+00	\N
13	2	7	Product Roadmapping	Expert	6.0	2025-12-08 09:51:40.980441+00	\N
14	2	7	Agile/Scrum	Expert	8.0	2025-12-08 09:51:40.980441+00	\N
15	2	7	User Story Mapping	Advanced	6.0	2025-12-08 09:51:40.980441+00	\N
16	2	5	Jira	Expert	7.0	2025-12-08 09:51:40.980441+00	\N
17	2	5	Confluence	Advanced	7.0	2025-12-08 09:51:40.980441+00	\N
18	2	5	Figma	Intermediate	4.0	2025-12-08 09:51:40.980441+00	\N
19	2	5	Mixpanel	Advanced	5.0	2025-12-08 09:51:40.980441+00	\N
20	3	6	Figma	Expert	5.0	2025-12-08 09:51:40.9845+00	\N
21	3	6	Adobe XD	Advanced	4.0	2025-12-08 09:51:40.9845+00	\N
22	3	6	Sketch	Advanced	4.0	2025-12-08 09:51:40.9845+00	\N
23	3	6	Adobe Photoshop	Expert	7.0	2025-12-08 09:51:40.9845+00	\N
24	3	6	Adobe Illustrator	Advanced	6.0	2025-12-08 09:51:40.9845+00	\N
25	3	5	InVision	Advanced	4.0	2025-12-08 09:51:40.9845+00	\N
26	3	5	Miro	Intermediate	3.0	2025-12-08 09:51:40.9845+00	\N
27	4	1	Python	Expert	8.0	2025-12-08 09:51:40.989639+00	\N
28	4	1	R	Advanced	6.0	2025-12-08 09:51:40.989639+00	\N
29	4	1	SQL	Expert	7.0	2025-12-08 09:51:40.989639+00	\N
30	4	8	TensorFlow	Expert	5.0	2025-12-08 09:51:40.989639+00	\N
31	4	8	PyTorch	Expert	5.0	2025-12-08 09:51:40.989639+00	\N
32	4	8	Scikit-learn	Expert	6.0	2025-12-08 09:51:40.989639+00	\N
33	4	8	Keras	Advanced	4.0	2025-12-08 09:51:40.989639+00	\N
34	4	8	Pandas	Expert	7.0	2025-12-08 09:51:40.989639+00	\N
35	4	8	NumPy	Expert	7.0	2025-12-08 09:51:40.989639+00	\N
36	4	4	Apache Spark	Advanced	4.0	2025-12-08 09:51:40.989639+00	\N
37	4	4	AWS SageMaker	Advanced	3.0	2025-12-08 09:51:40.989639+00	\N
38	5	4	AWS	Expert	6.0	2025-12-08 09:51:40.993972+00	\N
39	5	4	Azure	Advanced	4.0	2025-12-08 09:51:40.993972+00	\N
40	5	4	Docker	Expert	6.0	2025-12-08 09:51:40.993972+00	\N
41	5	4	Kubernetes	Expert	5.0	2025-12-08 09:51:40.993972+00	\N
42	5	4	Terraform	Advanced	4.0	2025-12-08 09:51:40.993972+00	\N
43	5	4	Jenkins	Advanced	5.0	2025-12-08 09:51:40.993972+00	\N
44	5	4	GitLab CI	Advanced	4.0	2025-12-08 09:51:40.993972+00	\N
45	5	1	Python	Advanced	5.0	2025-12-08 09:51:40.993972+00	\N
46	5	1	Bash	Expert	7.0	2025-12-08 09:51:40.993972+00	\N
47	8	1	JavaScript	Advanced	5.0	2025-12-08 09:51:40.998139+00	\N
48	8	1	TypeScript	Advanced	3.0	2025-12-08 09:51:40.998139+00	\N
49	8	1	Python	Intermediate	3.0	2025-12-08 09:51:40.998139+00	\N
50	8	2	React	Advanced	4.0	2025-12-08 09:51:40.998139+00	\N
51	8	2	Vue.js	Advanced	3.0	2025-12-08 09:51:40.998139+00	\N
52	8	2	Node.js	Advanced	4.0	2025-12-08 09:51:40.998139+00	\N
53	8	3	PostgreSQL	Intermediate	3.0	2025-12-08 09:51:40.998139+00	\N
54	8	3	MySQL	Intermediate	4.0	2025-12-08 09:51:40.998139+00	\N
\.


--
-- Data for Name: employee_volunteering; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_volunteering (id, employee_id, role, organization, start_date, end_date, is_current, created_at, updated_at) FROM stdin;
1	1	Coding Mentor	Girls Who Code	2020-01-15	\N	t	2025-12-08 09:51:41.058025+00	\N
2	1	Technical Workshop Instructor	Code.org	2019-06-01	2020-12-31	f	2025-12-08 09:51:41.058025+00	\N
3	2	Product Mentor	Product School Pro Bono Program	2021-03-01	\N	t	2025-12-08 09:51:41.058025+00	\N
4	3	Design Mentor	AIGA Mentorship Program	2021-09-01	\N	t	2025-12-08 09:51:41.058025+00	\N
5	4	AI Ethics Committee Member	Partnership on AI	2022-01-15	\N	t	2025-12-08 09:51:41.058025+00	\N
6	4	STEM Educator	Local High School	2019-09-01	2021-06-30	f	2025-12-08 09:51:41.058025+00	\N
7	5	Tech Workshop Leader	Women in Technology	2020-05-01	\N	t	2025-12-08 09:51:41.058025+00	\N
8	7	Career Coach	Nonprofit Job Training Program	2018-03-01	\N	t	2025-12-08 09:51:41.058025+00	\N
9	8	Programming Tutor	Local Community Center	2022-01-10	\N	t	2025-12-08 09:51:41.058025+00	\N
\.


--
-- Data for Name: employee_work_experience; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employee_work_experience (id, employee_id, job_title, company, employment_type, country, city, start_date, end_date, is_current, description, created_at, updated_at) FROM stdin;
1	1	Senior Software Engineer	Current Company	Full-time	United States	San Francisco	2020-03-15	\N	t	Leading development of microservices architecture	2025-12-08 09:51:40.911148+00	\N
2	1	Software Engineer	TechCorp Inc	Full-time	United States	San Francisco	2017-06-01	2020-03-10	f	Developed and maintained web applications	2025-12-08 09:51:40.911148+00	\N
3	1	Junior Developer	StartupXYZ	Full-time	United States	San Jose	2015-08-15	2017-05-30	f	Built features for SaaS platform	2025-12-08 09:51:40.911148+00	\N
4	2	Product Manager	Current Company	Full-time	United States	Seattle	2019-07-01	\N	t	Managing product roadmap and strategy	2025-12-08 09:51:40.915395+00	\N
5	2	Associate Product Manager	BigTech Solutions	Full-time	United States	Seattle	2017-03-15	2019-06-30	f	Supported product development initiatives	2025-12-08 09:51:40.915395+00	\N
6	2	Business Analyst	Consulting Group	Full-time	Canada	Toronto	2015-01-10	2017-03-01	f	Analyzed business requirements	2025-12-08 09:51:40.915395+00	\N
7	3	UX/UI Designer	Current Company	Full-time	United States	Austin	2021-01-20	\N	t	Leading design for mobile and web products	2025-12-08 09:51:40.919235+00	\N
8	3	UI Designer	Design Studio	Full-time	United States	Austin	2019-04-01	2021-01-15	f	Created user interfaces for client projects	2025-12-08 09:51:40.919235+00	\N
9	3	Graphic Designer	Creative Agency	Contract	Mexico	Mexico City	2017-09-01	2019-03-30	f	Designed marketing materials and branding	2025-12-08 09:51:40.919235+00	\N
10	4	Data Scientist	Current Company	Full-time	United States	New York	2020-09-10	\N	t	Building ML models for predictive analytics	2025-12-08 09:51:40.922836+00	\N
11	4	Machine Learning Engineer	AI Innovations	Full-time	United States	Boston	2018-07-01	2020-09-01	f	Developed deep learning models	2025-12-08 09:51:40.922836+00	\N
12	4	Data Analyst	Analytics Corp	Full-time	India	Bangalore	2016-06-15	2018-06-30	f	Performed statistical analysis	2025-12-08 09:51:40.922836+00	\N
13	5	DevOps Engineer	Current Company	Full-time	United States	Boston	2018-11-05	\N	t	Managing cloud infrastructure and CI/CD	2025-12-08 09:51:40.926348+00	\N
14	5	Systems Administrator	Enterprise Tech	Full-time	United Kingdom	London	2016-03-20	2018-10-30	f	Maintained server infrastructure	2025-12-08 09:51:40.926348+00	\N
15	5	IT Support Specialist	Tech Services Ltd	Full-time	United Kingdom	Manchester	2014-05-10	2016-03-15	f	Provided technical support	2025-12-08 09:51:40.926348+00	\N
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.employees (id, first_name, last_name, title, department, hire_date, salary, is_active, created_at, updated_at) FROM stdin;
1	Sarah	Johnson	Senior Software Engineer	Engineering	2020-03-15 00:00:00	120000	t	2025-12-08 09:51:40.894385+00	\N
2	Michael	Chen	Product Manager	Product	2019-07-01 00:00:00	135000	t	2025-12-08 09:51:40.894385+00	\N
3	Emily	Rodriguez	UX/UI Designer	Design	2021-01-20 00:00:00	95000	t	2025-12-08 09:51:40.894385+00	\N
4	David	Kumar	Data Scientist	Data & Analytics	2020-09-10 00:00:00	125000	t	2025-12-08 09:51:40.894385+00	\N
5	Jennifer	Williams	DevOps Engineer	Infrastructure	2018-11-05 00:00:00	115000	t	2025-12-08 09:51:40.894385+00	\N
6	Robert	Anderson	Marketing Manager	Marketing	2022-02-14 00:00:00	98000	f	2025-12-08 09:51:40.894385+00	\N
7	Lisa	Thompson	HR Director	Human Resources	2017-05-22 00:00:00	110000	t	2025-12-08 09:51:40.894385+00	\N
8	James	Martinez	Full Stack Developer	Engineering	2021-08-30 00:00:00	105000	t	2025-12-08 09:51:40.894385+00	\N
\.


--
-- Data for Name: job_application_notes; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.job_application_notes (id, application_id, author_id, note, created_at) FROM stdin;
1	1	1	Initial screening passed. Candidate has strong communication skills and deep knowledge of React patterns.	2024-11-03 18:00:00+00
2	1	2	Technical interview scheduled for next Tuesday. Sent HackerRank link.	2024-11-04 16:30:00+00
3	2	1	Portfolio is impressive. Specifically the e-commerce project. Lets schedule a screen.	2024-11-04 17:00:00+00
4	5	1	Candidate is very senior but salary expectations are outside our current band. Good to keep in network for future Lead roles.	2024-11-07 21:00:00+00
5	6	3	Great experience with B2B SaaS. Culture fit seems perfect.	2024-11-12 18:00:00+00
6	24	1	Passed all technical rounds with flying colors. Offer letter sent.	2024-10-18 22:00:00+00
7	24	4	Offer accepted. Start date set for Nov 1st.	2024-10-20 16:00:00+00
8	21	3	Very strong on the digital marketing side. Slightly less experience with traditional print media, but that is not a dealbreaker.	2024-12-07 18:00:00+00
\.


--
-- Data for Name: job_applications; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.job_applications (id, job_posting_id, candidate_name, email, phone, resume_url, cover_letter, portfolio_url, linkedin_url, source, status, applied_at, updated_at) FROM stdin;
2	11	Maria Garcia	maria.garcia@email.com	+1-555-1002	https://storage.company.com/resumes/maria_garcia.pdf	I have been following your company for years and would love to contribute to your engineering team. My experience with React and Node.js aligns perfectly with your requirements...	https://mariagarcia.portfolio.com	https://linkedin.com/in/mariagarcia	Company Website	Shortlisted	2024-11-03 21:15:00+00	\N
3	11	John Davis	john.davis@email.com	+1-555-1003	https://storage.company.com/resumes/john_davis.pdf	As a passionate full stack developer with extensive experience in modern web technologies, I am confident I can make significant contributions to your team...	https://johndavis.dev	https://linkedin.com/in/johndavis	Indeed	New	2024-11-05 16:45:00+00	\N
4	11	Sarah Kim	sarah.kim@email.com	+1-555-1004	https://storage.company.com/resumes/sarah_kim.pdf	I am writing to express my strong interest in the Senior Full Stack Developer role. My background in building microservices and cloud-native applications makes me an ideal candidate...	\N	https://linkedin.com/in/sarahkim	Referral	Shortlisted	2024-11-04 18:20:00+00	\N
5	11	Michael Brown	michael.brown@email.com	+1-555-1005	https://storage.company.com/resumes/michael_brown.pdf	With over 8 years of experience in full stack development, I have successfully delivered numerous projects using React, Node.js, and AWS...	https://michaelbrown.codes	https://linkedin.com/in/michaelbrown	LinkedIn	Rejected	2024-11-06 23:30:00+00	\N
6	2	Emily Wilson	emily.wilson@email.com	+1-555-2001	https://storage.company.com/resumes/emily_wilson.pdf	I am thrilled to apply for the Product Manager position. With 5 years of product management experience in B2B SaaS, I have successfully launched multiple products from concept to market...	https://emilywilson.pm	https://linkedin.com/in/emilywilson	LinkedIn	Interview	2024-11-11 16:00:00+00	\N
7	2	David Lee	david.lee@email.com	+1-555-2002	https://storage.company.com/resumes/david_lee.pdf	As a data-driven product manager with a strong technical background, I excel at translating user needs into successful products...	\N	https://linkedin.com/in/davidlee	Company Website	Shortlisted	2024-11-12 20:45:00+00	\N
1	11	Alex Thompson	alex.thompson@email.com	+1-555-1001	https://storage.company.com/resumes/alex_thompson.pdf	I am excited to apply for the Senior Full Stack Developer position. With 7 years of experience in building scalable web applications, I believe I would be a great fit for your team...	https://alexthompson.dev	https://linkedin.com/in/alexthompson	LinkedIn	Interview	2024-11-02 17:30:00+00	\N
8	2	Jennifer Martinez	jennifer.martinez@email.com	+1-555-2003	https://storage.company.com/resumes/jennifer_martinez.pdf	I bring 6 years of product management experience with a proven track record of increasing user engagement and revenue...	https://jennifermartinez.com	https://linkedin.com/in/jennifermartinez	Glassdoor	New	2024-11-13 17:30:00+00	\N
9	3	Sophia Anderson	sophia.anderson@email.com	+1-555-3001	https://storage.company.com/resumes/sophia_anderson.pdf	I am passionate about creating user-centered designs that solve real problems. My portfolio demonstrates my ability to balance aesthetics with usability...	https://sophiaanderson.design	https://linkedin.com/in/sophiaanderson	Behance	Shortlisted	2024-11-16 21:00:00+00	\N
10	3	Daniel Taylor	daniel.taylor@email.com	+1-555-3002	https://storage.company.com/resumes/daniel_taylor.pdf	With 4 years of UX/UI design experience, I have worked on both web and mobile applications for various industries...	https://danieltaylor.portfolio.io	https://linkedin.com/in/danieltaylor	LinkedIn	New	2024-11-17 18:15:00+00	\N
11	3	Rachel Green	rachel.green@email.com	+1-555-3003	https://storage.company.com/resumes/rachel_green.pdf	I am a creative designer with a strong foundation in user research and design thinking. I would love to bring my skills to your team...	https://rachelgreen.design	https://linkedin.com/in/rachelgreen	Company Website	Shortlisted	2024-11-18 16:30:00+00	\N
12	3	Oliver White	oliver.white@email.com	+1-555-3004	https://storage.company.com/resumes/oliver_white.pdf	As a UX designer focused on accessibility and inclusive design, I create experiences that work for everyone...	https://oliverwhite.ux	https://linkedin.com/in/oliverwhite	Dribbble	Rejected	2024-11-15 22:45:00+00	\N
13	4	James Wilson	james.wilson@email.com	+1-555-4001	https://storage.company.com/resumes/james_wilson.pdf	I have 6 years of experience in DevOps with a strong focus on AWS infrastructure and Kubernetes orchestration...	\N	https://linkedin.com/in/jameswilson	LinkedIn	Interview	2024-11-21 17:00:00+00	\N
14	4	Lisa Chen	lisa.chen@email.com	+1-555-4002	https://storage.company.com/resumes/lisa_chen.pdf	As a DevOps engineer passionate about automation and infrastructure as code, I have successfully reduced deployment times by 70%...	https://github.com/lisachen	https://linkedin.com/in/lisachen	Company Website	Shortlisted	2024-11-22 21:30:00+00	\N
15	5	Robert Johnson	robert.johnson@email.com	+1-555-5001	https://storage.company.com/resumes/robert_johnson.pdf	I am a data scientist with 5 years of experience building machine learning models for various business applications...	https://github.com/robertjohnson	https://linkedin.com/in/robertjohnson	LinkedIn	Shortlisted	2024-11-26 16:15:00+00	\N
16	5	Amanda Zhang	amanda.zhang@email.com	+1-555-5002	https://storage.company.com/resumes/amanda_zhang.pdf	With a PhD in Statistics and 4 years of industry experience, I specialize in building predictive models and deriving actionable insights...	https://amandazhang.data	https://linkedin.com/in/amandazhang	Indeed	New	2024-11-27 20:00:00+00	\N
17	5	Kevin Park	kevin.park@email.com	+1-555-5003	https://storage.company.com/resumes/kevin_park.pdf	I am excited about the opportunity to apply my machine learning expertise to solve complex business problems...	\N	https://linkedin.com/in/kevinpark	Company Website	New	2024-11-28 17:45:00+00	\N
18	6	Emma Roberts	emma.roberts@email.com	+1-555-6001	https://storage.company.com/resumes/emma_roberts.pdf	I recently completed a coding bootcamp and have been building React applications. I am eager to learn and grow as a developer...	https://emmaroberts.dev	https://linkedin.com/in/emmaroberts	LinkedIn	Shortlisted	2024-12-02 16:30:00+00	\N
19	6	Chris Miller	chris.miller@email.com	+1-555-6002	https://storage.company.com/resumes/chris_miller.pdf	As a self-taught developer with 1 year of experience, I have built several personal projects and contributed to open source...	https://github.com/chrismiller	https://linkedin.com/in/chrismiller	Company Website	New	2024-12-03 18:00:00+00	\N
20	6	Jessica Brown	jessica.brown@email.com	+1-555-6003	https://storage.company.com/resumes/jessica_brown.pdf	I am a recent graduate with a strong foundation in web development and a passion for creating beautiful user interfaces...	https://jessicabrown.portfolio.com	https://linkedin.com/in/jessicabrown	University Career Fair	New	2024-12-04 21:15:00+00	\N
21	7	Nicole Adams	nicole.adams@email.com	+1-555-7001	https://storage.company.com/resumes/nicole_adams.pdf	With 7 years of B2B marketing experience, I have successfully led campaigns that generated millions in revenue...	\N	https://linkedin.com/in/nicoleadams	LinkedIn	Interview	2024-12-06 17:00:00+00	\N
22	7	Brian Turner	brian.turner@email.com	+1-555-7002	https://storage.company.com/resumes/brian_turner.pdf	I am a strategic marketing professional with expertise in digital marketing, content strategy, and brand development...	https://brianturner.marketing	https://linkedin.com/in/brianturner	Company Website	Shortlisted	2024-12-07 20:30:00+00	\N
23	8	Patricia Lewis	patricia.lewis@email.com	+1-555-8001	https://storage.company.com/resumes/patricia_lewis.pdf	I am an experienced HR professional with SHRM-SCP certification and 8 years of experience in talent management...	\N	https://linkedin.com/in/patricialewis	LinkedIn	New	2024-11-08 16:00:00+00	\N
24	9	Thomas Wright	thomas.wright@email.com	+1-555-9001	https://storage.company.com/resumes/thomas_wright.pdf	I am a senior backend engineer with 8 years of Java development experience...	\N	https://linkedin.com/in/thomaswright	LinkedIn	Hired	2024-10-20 17:30:00+00	\N
25	9	Karen Hill	karen.hill@email.com	+1-555-9002	https://storage.company.com/resumes/karen_hill.pdf	With extensive experience in microservices architecture and Spring Boot, I would be a great addition...	\N	https://linkedin.com/in/karenhill	Indeed	Rejected	2024-10-25 21:00:00+00	\N
\.


--
-- Data for Name: job_posting_activities; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.job_posting_activities (id, job_posting_id, actor_id, action_type, details, created_at) FROM stdin;
63	11	1	CREATED	Job posting created in Draft status	2024-10-30 16:00:00+00
64	11	1	STATUS_CHANGE	Changed status from Draft to Active	2024-11-01 16:00:00+00
65	11	\N	NEW_APPLICATION	New application received from Alex Thompson	2024-11-02 17:30:00+00
66	11	\N	NEW_APPLICATION	New application received from Maria Garcia	2024-11-03 21:15:00+00
67	11	1	UPDATE	Updated salary range to match market rates	2024-11-05 17:00:00+00
68	8	4	CREATED	Job posting created	2024-11-05 16:00:00+00
69	8	4	STATUS_CHANGE	Changed status from Active to Paused	2024-11-20 16:00:00+00
70	9	1	CREATED	Job posting created	2024-10-15 15:00:00+00
71	9	1	STATUS_CHANGE	Changed status from Draft to Active	2024-10-15 15:30:00+00
72	9	\N	NEW_APPLICATION	New application received from Thomas Wright	2024-10-20 17:30:00+00
73	9	1	STATUS_CHANGE	Changed status from Active to Closed	2024-10-21 16:00:00+00
\.


--
-- Data for Name: job_posting_daily_stats; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.job_posting_daily_stats (id, job_posting_id, date, views_count, applications_count) FROM stdin;
187	11	2024-11-01	45	0
188	11	2024-11-02	120	1
189	11	2024-11-03	98	1
190	11	2024-11-04	156	1
191	11	2024-11-05	134	1
192	11	2024-11-06	89	1
193	11	2024-11-07	76	0
194	2	2024-11-10	55	0
195	2	2024-11-11	145	1
196	2	2024-11-12	132	1
197	2	2024-11-13	110	1
198	2	2024-11-14	95	0
199	4	2024-11-20	60	0
200	4	2024-11-21	180	1
201	4	2024-11-22	165	1
202	4	2024-11-23	90	0
\.


--
-- Data for Name: job_posting_notes; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.job_posting_notes (id, job_posting_id, author_id, note, created_at) FROM stdin;
29	11	4	Budget approved for up to $165k if the candidate is exceptional.	2024-10-25 17:00:00+00
30	11	1	Need to fill this role by end of Q4 to support the new dashboard project.	2024-11-01 21:00:00+00
31	8	4	Freezing this role temporarily due to Q4 budget adjustments. Will revisit in Jan 2025.	2024-11-20 16:00:00+00
32	10	2	Waiting for final requirements from the Product team before publishing.	2024-12-01 17:00:00+00
33	9	1	Position filled successfully. Onboarding started.	2024-10-21 16:00:00+00
\.


--
-- Data for Name: job_postings; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.job_postings (id, title, department, location, work_type, status, description, responsibilities, requirements, benefits, salary_range_min, salary_range_max, salary_currency, posting_date, expiration_date, created_by, created_at, updated_at) FROM stdin;
2	Senior Full Stack Developer	Engineering	San Francisco, CA	Hybrid	Active	We are looking for an experienced Full Stack Developer to join our growing engineering team. You will be responsible for developing and maintaining our web applications using modern technologies.	{"Design and develop scalable web applications","Write clean, maintainable code following best practices","Collaborate with product managers and designers","Participate in code reviews and technical discussions","Mentor junior developers","Optimize application performance and user experience"}	{"5+ years of experience in full stack development","Strong proficiency in JavaScript, TypeScript, React, and Node.js","Experience with PostgreSQL or other relational databases","Familiarity with cloud platforms (AWS, Azure, or GCP)","Strong problem-solving and communication skills","Bachelor's degree in Computer Science or related field"}	{"Competitive salary and equity","Comprehensive health, dental, and vision insurance","Flexible work arrangements","401(k) with company match","Professional development budget","Unlimited PTO","Gym membership reimbursement"}	120000	160000	USD	2024-11-01 16:00:00+00	2025-02-01 06:59:59+00	1	2025-12-11 09:17:29.594135+00	\N
3	Product Manager	Product	Remote	Remote	Active	Seeking a strategic Product Manager to drive product vision and execution. You will work closely with engineering, design, and stakeholders to deliver exceptional products.	{"Define product roadmap and strategy","Conduct user research and gather feedback","Write detailed product specifications and user stories","Prioritize features based on business impact","Collaborate with cross-functional teams","Analyze product metrics and make data-driven decisions"}	{"3+ years of product management experience","Experience with B2B SaaS products preferred","Strong analytical and problem-solving skills","Excellent communication and presentation skills","Experience with product management tools (Jira, Confluence)","Technical background is a plus"}	{"Competitive salary","Remote work flexibility","Health insurance","Stock options","Learning and development opportunities","Annual team retreats"}	110000	140000	USD	2024-11-10 15:00:00+00	2025-02-11 06:59:59+00	1	2025-12-11 09:17:29.594135+00	\N
4	UX/UI Designer	Design	Austin, TX	Hybrid	Active	We are looking for a creative UX/UI Designer to help us create intuitive and beautiful user experiences. You will work on web and mobile applications.	{"Create wireframes, prototypes, and high-fidelity designs","Conduct user research and usability testing","Develop and maintain design systems","Collaborate with product and engineering teams","Present design concepts to stakeholders","Stay updated with design trends and best practices"}	{"3+ years of UX/UI design experience","Proficiency in Figma, Sketch, or Adobe XD","Strong portfolio demonstrating design process","Understanding of user-centered design principles","Experience with responsive and mobile design","Bachelor's degree in Design or related field"}	{"Competitive salary","Health and wellness benefits","Flexible schedule","Professional development budget","Latest design tools and software","Creative and collaborative work environment"}	85000	110000	USD	2024-11-15 17:00:00+00	2025-02-16 06:59:59+00	2	2025-12-11 09:17:29.594135+00	\N
5	DevOps Engineer	Infrastructure	New York, NY	Onsite	Active	Join our infrastructure team as a DevOps Engineer. You will be responsible for building and maintaining our cloud infrastructure and CI/CD pipelines.	{"Design and implement CI/CD pipelines","Manage cloud infrastructure on AWS","Implement monitoring and alerting solutions","Automate deployment processes","Ensure system security and compliance","Troubleshoot production issues"}	{"4+ years of DevOps experience","Strong knowledge of AWS services","Experience with Docker and Kubernetes","Proficiency in Infrastructure as Code (Terraform)","Scripting skills (Python, Bash)","Experience with CI/CD tools (Jenkins, GitLab CI)"}	{"Competitive salary and bonuses","Comprehensive health benefits","401(k) matching","Transit benefits","Continuing education support","Modern office in downtown Manhattan"}	115000	145000	USD	2024-11-20 16:00:00+00	2025-02-21 06:59:59+00	1	2025-12-11 09:17:29.594135+00	\N
6	Data Scientist	Data & Analytics	Seattle, WA	Hybrid	Active	We are seeking a talented Data Scientist to join our analytics team. You will build machine learning models and derive insights from complex datasets.	{"Develop and deploy machine learning models","Analyze large datasets to identify trends and patterns","Create data visualizations and reports","Collaborate with product teams on data-driven features","Build and maintain data pipelines","Present findings to stakeholders"}	{"3+ years of data science experience","Strong proficiency in Python and SQL","Experience with ML frameworks (TensorFlow, PyTorch, Scikit-learn)","Knowledge of statistical analysis and hypothesis testing","Experience with big data tools (Spark, Hadoop)","Master's degree in Computer Science, Statistics, or related field"}	{"Competitive salary","Stock options","Comprehensive benefits package","Flexible work schedule","Learning stipend","Conference attendance opportunities"}	120000	155000	USD	2024-11-25 15:00:00+00	2025-02-26 06:59:59+00	2	2025-12-11 09:17:29.594135+00	\N
7	Junior Frontend Developer	Engineering	Remote	Remote	Active	Great opportunity for a junior developer to grow their skills. You will work on modern web applications using React and TypeScript.	{"Build responsive web interfaces with React","Implement designs from Figma mockups","Write clean, testable code","Participate in code reviews","Learn from senior developers","Contribute to team documentation"}	{"1-2 years of frontend development experience","Knowledge of HTML, CSS, and JavaScript","Familiarity with React","Understanding of RESTful APIs","Git version control experience","Bachelor's degree or coding bootcamp certificate"}	{"Competitive entry-level salary","Remote work","Mentorship program","Health insurance","Learning resources and courses","Career growth opportunities"}	70000	90000	USD	2024-12-01 16:00:00+00	2025-03-02 06:59:59+00	1	2025-12-11 09:17:29.594135+00	\N
8	Marketing Manager	Marketing	Los Angeles, CA	Hybrid	Active	We are looking for a strategic Marketing Manager to lead our marketing initiatives and drive brand awareness.	{"Develop and execute marketing strategies","Manage digital marketing campaigns","Analyze campaign performance and ROI","Collaborate with sales and product teams","Manage marketing budget","Lead a team of marketing specialists"}	{"5+ years of marketing experience","Proven track record in B2B marketing","Strong analytical skills","Experience with marketing automation tools","Excellent written and verbal communication","MBA preferred but not required"}	{"Competitive salary and bonus","Health and wellness benefits","Flexible work arrangement","Professional development","Team building events","Stock options"}	95000	125000	USD	2024-12-05 17:00:00+00	2025-03-06 06:59:59+00	3	2025-12-11 09:17:29.594135+00	\N
9	HR Business Partner	Human Resources	Boston, MA	Hybrid	Paused	Seeking an experienced HR Business Partner to support our growing organization. You will partner with leadership on talent management and organizational development.	{"Partner with business leaders on HR strategy","Manage employee relations and conflict resolution","Lead talent acquisition and onboarding","Develop and implement HR policies","Conduct performance management processes","Drive employee engagement initiatives"}	{"5+ years of HR experience","SHRM-CP or PHR certification preferred","Strong knowledge of employment law","Excellent interpersonal skills","Experience with HRIS systems","Bachelor's degree in HR or related field"}	{"Competitive salary","Comprehensive benefits","Professional development","401(k) with match","Flexible schedule","Collaborative team environment"}	90000	115000	USD	2024-11-05 16:00:00+00	2025-02-06 06:59:59+00	4	2025-12-11 09:17:29.594135+00	\N
10	Senior Backend Engineer - Java	Engineering	Chicago, IL	Onsite	Closed	We were looking for a Senior Backend Engineer with strong Java expertise. Position has been filled.	{"Design and develop microservices","Optimize database queries","Implement security best practices","Mentor junior engineers","Participate in architecture decisions"}	{"6+ years Java development experience","Experience with Spring Boot","Knowledge of microservices architecture","Strong database skills (PostgreSQL, MongoDB)","Cloud experience (AWS or Azure)"}	{"Competitive salary","Health benefits","401(k) matching","Bonus potential"}	130000	165000	USD	2024-10-15 15:00:00+00	2024-12-16 06:59:59+00	1	2025-12-11 09:17:29.594135+00	\N
11	Mobile Developer (iOS/Android)	Engineering	Denver, CO	Hybrid	Draft	We are preparing to hire a Mobile Developer to build our native mobile applications for iOS and Android platforms.	{"Develop native mobile applications","Implement mobile UI/UX designs","Integrate with backend APIs","Optimize app performance","Participate in app store releases","Maintain existing mobile applications"}	{"3+ years of mobile development experience","Proficiency in Swift and Kotlin","Experience with React Native is a plus","Understanding of mobile design patterns","Knowledge of RESTful APIs","Published apps in App Store and Google Play"}	{"Competitive salary","Health insurance","Flexible work schedule","Latest mobile devices for testing","Professional development","Stock options"}	100000	130000	USD	\N	\N	2	2025-12-11 09:17:29.594135+00	\N
\.


--
-- Data for Name: project_achievements; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.project_achievements (id, project_id, achievement, display_order) FROM stdin;
1	1	Reduced page load time by 60% through optimization	1
2	1	Achieved 99.99% uptime during migration	2
3	1	Mentored 3 junior engineers throughout the project	3
4	2	Processed over 100 million events per day	1
5	2	Reduced data latency from minutes to milliseconds	2
6	4	Reached 100K downloads within first month of launch	1
7	4	Achieved 4.7-star rating on app stores	2
8	6	Reduced design-to-development handoff time by 50%	1
9	6	Adopted by 15 product teams across the organization	2
10	8	Achieved 92% prediction accuracy	1
11	8	Model deployed to production serving 1M+ predictions daily	2
12	10	Completed migration 2 weeks ahead of schedule	1
13	10	Reduced infrastructure costs by 35%	2
\.


--
-- Data for Name: project_links; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.project_links (id, project_id, link_url, link_type) FROM stdin;
1	3	https://github.com/sarahjdev/react-perf-tools	github
2	3	https://react-perf-tools.dev	demo
3	3	https://docs.react-perf-tools.dev	documentation
4	12	https://github.com/jmartinez/social-dashboard	github
5	12	https://social-dashboard-demo.herokuapp.com	demo
\.


--
-- Data for Name: project_technologies; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.project_technologies (id, project_id, technology) FROM stdin;
1	1	Node.js
2	1	React
3	1	PostgreSQL
4	1	Redis
5	1	Docker
6	1	Kubernetes
7	1	AWS
8	2	Apache Kafka
9	2	Redis
10	2	React
11	2	D3.js
12	2	Node.js
13	3	React
14	3	TypeScript
15	3	Storybook
16	3	Jest
17	4	React Native
18	4	Firebase
19	4	Redux
20	4	TypeScript
21	5	Node.js
22	5	PostgreSQL
23	5	AWS
24	5	Stripe API
25	6	Figma
26	6	Storybook
27	6	React
28	6	CSS-in-JS
29	7	Figma
30	7	Sketch
31	7	InVision
32	7	Maze
33	8	Python
34	8	TensorFlow
35	8	XGBoost
36	8	Pandas
37	8	AWS SageMaker
38	9	Python
39	9	PyTorch
40	9	Apache Spark
41	9	Redis
42	10	AWS
43	10	Terraform
44	10	Docker
45	10	Kubernetes
46	10	Jenkins
47	11	GitLab CI
48	11	Docker
49	11	Kubernetes
50	11	Helm
51	11	ArgoCD
52	12	React
53	12	Node.js
54	12	Express
55	12	MongoDB
56	12	Chart.js
\.


--
-- Data for Name: skill_categories; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.skill_categories (id, category_name, description, created_at) FROM stdin;
1	Programming Languages	\N	2025-12-08 09:49:12.18256+00
2	Frameworks & Libraries	\N	2025-12-08 09:49:12.18256+00
3	Databases	\N	2025-12-08 09:49:12.18256+00
4	DevOps & Cloud	\N	2025-12-08 09:49:12.18256+00
5	Tools & Software	\N	2025-12-08 09:49:12.18256+00
6	Design	\N	2025-12-08 09:49:12.18256+00
7	Project Management	\N	2025-12-08 09:49:12.18256+00
8	Data Science & ML	\N	2025-12-08 09:49:12.18256+00
9	Mobile Development	\N	2025-12-08 09:49:12.18256+00
10	Testing	\N	2025-12-08 09:49:12.18256+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (id, email, hashed_password, full_name, is_active, role, created_at, updated_at) FROM stdin;
1	abc@123.com	$2b$12$oeNQaOJrG4NrRY.ewo5RO.KA.yoU8gyLUCaPTFzZxZGcWaOzrSAz2	Furkan Ulutas	t	ADMIN	2025-12-08 11:33:28.66727+00	\N
2	user@example.com	$2b$12$Z0t.M/taTt52/b408g9ioOUoTABgvnlLfqq/pMhdjTaSGZ.gXrm1O	string	t	ADMIN	2025-12-08 15:47:23.031083+00	\N
3	user2@example.com	$2b$12$Z0t.M/taTt52/b408g9ioOUoTABgvnlLfqq/pMhdjTaSGZ.gXrm1O	string	t	ADMIN	2025-12-08 15:47:23.031083+00	\N
4	user3@example.com	$2b$12$Z0t.M/taTt52/b408g9ioOUoTABgvnlLfqq/pMhdjTaSGZ.gXrm1O	string	t	ADMIN	2025-12-08 15:47:23.031083+00	\N
5	user4@example.com	$2b$12$Z0t.M/taTt52/b408g9ioOUoTABgvnlLfqq/pMhdjTaSGZ.gXrm1O	string	t	ADMIN	2025-12-08 15:47:23.031083+00	\N
6	user5@example.com	$2b$12$Z0t.M/taTt52/b408g9ioOUoTABgvnlLfqq/pMhdjTaSGZ.gXrm1O	string	t	ADMIN	2025-12-08 15:47:23.031083+00	\N
7	use6@example.com	$2b$12$Z0t.M/taTt52/b408g9ioOUoTABgvnlLfqq/pMhdjTaSGZ.gXrm1O	string	t	ADMIN	2025-12-08 15:47:23.031083+00	\N
\.


--
-- Data for Name: volunteering_responsibilities; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.volunteering_responsibilities (id, volunteering_id, responsibility, display_order) FROM stdin;
1	1	Mentor high school students learning programming fundamentals	1
2	1	Conduct weekly coding workshops covering web development	2
3	1	Review student projects and provide constructive feedback	3
4	2	Teach HTML, CSS, and JavaScript to beginners	1
5	2	Organize coding challenges and hackathons	2
6	3	Guide aspiring product managers in career development	1
7	3	Conduct mock interviews and provide feedback	2
8	4	Mentor junior designers in UX best practices	1
9	4	Review portfolio projects and provide career guidance	2
10	5	Participate in discussions on ethical AI development	1
11	5	Review AI policy recommendations	2
12	7	Lead workshops on DevOps and cloud technologies	1
13	7	Provide mentorship to women entering tech field	2
14	8	Coach job seekers on resume writing and interview skills	1
15	8	Connect candidates with job opportunities	2
\.


--
-- Data for Name: work_experience_achievements; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.work_experience_achievements (id, work_experience_id, achievement, display_order) FROM stdin;
1	1	Reduced system latency by 45% through architecture optimization	1
2	1	Received "Engineer of the Year" award in 2022	2
3	1	Successfully migrated legacy monolith to microservices with zero downtime	3
4	2	Implemented caching strategy that improved page load times by 50%	1
5	2	Contributed to open-source projects with 1000+ GitHub stars	2
6	4	Led launch of flagship feature that generated $2M in ARR	1
7	4	Increased product adoption by 40% through improved onboarding flow	2
8	10	Developed churn prediction model with 92% accuracy	1
9	10	Published research paper at ICML conference	2
\.


--
-- Data for Name: work_experience_responsibilities; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.work_experience_responsibilities (id, work_experience_id, responsibility, display_order) FROM stdin;
1	1	Lead a team of 5 engineers in designing and implementing microservices architecture	1
2	1	Architect scalable solutions handling 10M+ daily active users	2
3	1	Conduct code reviews and mentor junior developers	3
4	1	Collaborate with product managers to define technical requirements	4
5	1	Implement CI/CD pipelines reducing deployment time by 60%	5
6	2	Developed RESTful APIs using Node.js and Express	1
7	2	Built responsive front-end applications with React and Redux	2
8	2	Optimized database queries improving performance by 40%	3
9	2	Participated in agile ceremonies and sprint planning	4
10	4	Define product vision and roadmap for enterprise SaaS platform	1
11	4	Conduct user research and gather customer feedback	2
12	4	Prioritize feature development based on business impact	3
13	4	Work closely with engineering, design, and sales teams	4
14	4	Launch 3 major features resulting in 25% increase in user engagement	5
15	10	Design and deploy machine learning models for customer churn prediction	1
16	10	Build data pipelines processing 100GB+ daily data	2
17	10	Collaborate with business stakeholders to identify analytics opportunities	3
18	10	Present insights and recommendations to executive leadership	4
\.


--
-- Data for Name: work_experience_technologies; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.work_experience_technologies (id, work_experience_id, technology) FROM stdin;
1	1	JavaScript
2	1	TypeScript
3	1	React
4	1	Node.js
5	1	PostgreSQL
6	1	MongoDB
7	1	Docker
8	1	Kubernetes
9	1	AWS
10	1	Redis
11	2	JavaScript
12	2	React
13	2	Redux
14	2	Node.js
15	2	Express
16	2	MySQL
17	2	Git
18	2	Jest
19	3	HTML
20	3	CSS
21	3	JavaScript
22	3	jQuery
23	3	Bootstrap
24	4	Jira
25	4	Confluence
26	4	Mixpanel
27	4	Google Analytics
28	4	Figma
29	10	Python
30	10	TensorFlow
31	10	PyTorch
32	10	Scikit-learn
33	10	Pandas
34	10	NumPy
35	10	SQL
36	10	Apache Spark
37	10	AWS SageMaker
38	10	Jupyter
\.


--
-- Name: education_courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.education_courses_id_seq', 17, true);


--
-- Name: employee_additional_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_additional_info_id_seq', 8, true);


--
-- Name: employee_addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_addresses_id_seq', 16, true);


--
-- Name: employee_awards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_awards_id_seq', 8, true);


--
-- Name: employee_certifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_certifications_id_seq', 10, true);


--
-- Name: employee_education_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_education_id_seq', 14, true);


--
-- Name: employee_hobbies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_hobbies_id_seq', 28, true);


--
-- Name: employee_languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_languages_id_seq', 19, true);


--
-- Name: employee_personal_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_personal_info_id_seq', 16, true);


--
-- Name: employee_projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_projects_id_seq', 12, true);


--
-- Name: employee_publications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_publications_id_seq', 5, true);


--
-- Name: employee_soft_skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_soft_skills_id_seq', 38, true);


--
-- Name: employee_technical_skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_technical_skills_id_seq', 54, true);


--
-- Name: employee_volunteering_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_volunteering_id_seq', 9, true);


--
-- Name: employee_work_experience_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employee_work_experience_id_seq', 15, true);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.employees_id_seq', 8, true);


--
-- Name: job_application_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.job_application_notes_id_seq', 44, true);


--
-- Name: job_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.job_applications_id_seq', 31, true);


--
-- Name: job_posting_activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.job_posting_activities_id_seq', 73, true);


--
-- Name: job_posting_daily_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.job_posting_daily_stats_id_seq', 202, true);


--
-- Name: job_posting_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.job_posting_notes_id_seq', 33, true);


--
-- Name: job_postings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.job_postings_id_seq', 11, true);


--
-- Name: project_achievements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.project_achievements_id_seq', 13, true);


--
-- Name: project_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.project_links_id_seq', 5, true);


--
-- Name: project_technologies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.project_technologies_id_seq', 56, true);


--
-- Name: skill_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.skill_categories_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: volunteering_responsibilities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.volunteering_responsibilities_id_seq', 15, true);


--
-- Name: work_experience_achievements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.work_experience_achievements_id_seq', 9, true);


--
-- Name: work_experience_responsibilities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.work_experience_responsibilities_id_seq', 18, true);


--
-- Name: work_experience_technologies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.work_experience_technologies_id_seq', 38, true);


--
-- Name: education_courses education_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.education_courses
    ADD CONSTRAINT education_courses_pkey PRIMARY KEY (id);


--
-- Name: employee_additional_info employee_additional_info_employee_id_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_additional_info
    ADD CONSTRAINT employee_additional_info_employee_id_key UNIQUE (employee_id);


--
-- Name: employee_additional_info employee_additional_info_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_additional_info
    ADD CONSTRAINT employee_additional_info_pkey PRIMARY KEY (id);


--
-- Name: employee_addresses employee_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_addresses
    ADD CONSTRAINT employee_addresses_pkey PRIMARY KEY (id);


--
-- Name: employee_awards employee_awards_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_awards
    ADD CONSTRAINT employee_awards_pkey PRIMARY KEY (id);


--
-- Name: employee_certifications employee_certifications_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_certifications
    ADD CONSTRAINT employee_certifications_pkey PRIMARY KEY (id);


--
-- Name: employee_education employee_education_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_education
    ADD CONSTRAINT employee_education_pkey PRIMARY KEY (id);


--
-- Name: employee_hobbies employee_hobbies_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_hobbies
    ADD CONSTRAINT employee_hobbies_pkey PRIMARY KEY (id);


--
-- Name: employee_languages employee_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_languages
    ADD CONSTRAINT employee_languages_pkey PRIMARY KEY (id);


--
-- Name: employee_personal_info employee_personal_info_employee_id_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_personal_info
    ADD CONSTRAINT employee_personal_info_employee_id_key UNIQUE (employee_id);


--
-- Name: employee_personal_info employee_personal_info_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_personal_info
    ADD CONSTRAINT employee_personal_info_pkey PRIMARY KEY (id);


--
-- Name: employee_projects employee_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_projects
    ADD CONSTRAINT employee_projects_pkey PRIMARY KEY (id);


--
-- Name: employee_publications employee_publications_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_publications
    ADD CONSTRAINT employee_publications_pkey PRIMARY KEY (id);


--
-- Name: employee_soft_skills employee_soft_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_soft_skills
    ADD CONSTRAINT employee_soft_skills_pkey PRIMARY KEY (id);


--
-- Name: employee_technical_skills employee_technical_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_technical_skills
    ADD CONSTRAINT employee_technical_skills_pkey PRIMARY KEY (id);


--
-- Name: employee_volunteering employee_volunteering_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_volunteering
    ADD CONSTRAINT employee_volunteering_pkey PRIMARY KEY (id);


--
-- Name: employee_work_experience employee_work_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_work_experience
    ADD CONSTRAINT employee_work_experience_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: job_application_notes job_application_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_application_notes
    ADD CONSTRAINT job_application_notes_pkey PRIMARY KEY (id);


--
-- Name: job_applications job_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_pkey PRIMARY KEY (id);


--
-- Name: job_posting_activities job_posting_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_activities
    ADD CONSTRAINT job_posting_activities_pkey PRIMARY KEY (id);


--
-- Name: job_posting_daily_stats job_posting_daily_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_daily_stats
    ADD CONSTRAINT job_posting_daily_stats_pkey PRIMARY KEY (id);


--
-- Name: job_posting_notes job_posting_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_notes
    ADD CONSTRAINT job_posting_notes_pkey PRIMARY KEY (id);


--
-- Name: job_postings job_postings_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_postings
    ADD CONSTRAINT job_postings_pkey PRIMARY KEY (id);


--
-- Name: project_achievements project_achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.project_achievements
    ADD CONSTRAINT project_achievements_pkey PRIMARY KEY (id);


--
-- Name: project_links project_links_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.project_links
    ADD CONSTRAINT project_links_pkey PRIMARY KEY (id);


--
-- Name: project_technologies project_technologies_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.project_technologies
    ADD CONSTRAINT project_technologies_pkey PRIMARY KEY (id);


--
-- Name: skill_categories skill_categories_category_name_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.skill_categories
    ADD CONSTRAINT skill_categories_category_name_key UNIQUE (category_name);


--
-- Name: skill_categories skill_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.skill_categories
    ADD CONSTRAINT skill_categories_pkey PRIMARY KEY (id);


--
-- Name: job_posting_daily_stats uq_job_posting_date; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_daily_stats
    ADD CONSTRAINT uq_job_posting_date UNIQUE (job_posting_id, date);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: volunteering_responsibilities volunteering_responsibilities_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.volunteering_responsibilities
    ADD CONSTRAINT volunteering_responsibilities_pkey PRIMARY KEY (id);


--
-- Name: work_experience_achievements work_experience_achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.work_experience_achievements
    ADD CONSTRAINT work_experience_achievements_pkey PRIMARY KEY (id);


--
-- Name: work_experience_responsibilities work_experience_responsibilities_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.work_experience_responsibilities
    ADD CONSTRAINT work_experience_responsibilities_pkey PRIMARY KEY (id);


--
-- Name: work_experience_technologies work_experience_technologies_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.work_experience_technologies
    ADD CONSTRAINT work_experience_technologies_pkey PRIMARY KEY (id);


--
-- Name: idx_achievements_work_exp_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_achievements_work_exp_id ON public.work_experience_achievements USING btree (work_experience_id);


--
-- Name: idx_additional_info_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_additional_info_employee_id ON public.employee_additional_info USING btree (employee_id);


--
-- Name: idx_application_notes_application_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_application_notes_application_id ON public.job_application_notes USING btree (application_id);


--
-- Name: idx_awards_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_awards_employee_id ON public.employee_awards USING btree (employee_id);


--
-- Name: idx_certifications_dates; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_certifications_dates ON public.employee_certifications USING btree (issue_date, expiration_date);


--
-- Name: idx_certifications_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_certifications_employee_id ON public.employee_certifications USING btree (employee_id);


--
-- Name: idx_courses_education_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_courses_education_id ON public.education_courses USING btree (education_id);


--
-- Name: idx_education_dates; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_education_dates ON public.employee_education USING btree (start_date, end_date);


--
-- Name: idx_education_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_education_employee_id ON public.employee_education USING btree (employee_id);


--
-- Name: idx_employee_addresses_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_employee_addresses_employee_id ON public.employee_addresses USING btree (employee_id);


--
-- Name: idx_employee_personal_info_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_employee_personal_info_employee_id ON public.employee_personal_info USING btree (employee_id);


--
-- Name: idx_hobbies_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_hobbies_employee_id ON public.employee_hobbies USING btree (employee_id);


--
-- Name: idx_job_applications_email; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_job_applications_email ON public.job_applications USING btree (email);


--
-- Name: idx_job_applications_posting_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_job_applications_posting_id ON public.job_applications USING btree (job_posting_id);


--
-- Name: idx_job_applications_status; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_job_applications_status ON public.job_applications USING btree (status);


--
-- Name: idx_job_posting_activities_posting_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_job_posting_activities_posting_id ON public.job_posting_activities USING btree (job_posting_id);


--
-- Name: idx_job_posting_daily_stats_posting_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_job_posting_daily_stats_posting_id ON public.job_posting_daily_stats USING btree (job_posting_id);


--
-- Name: idx_job_posting_notes_posting_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_job_posting_notes_posting_id ON public.job_posting_notes USING btree (job_posting_id);


--
-- Name: idx_job_postings_department; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_job_postings_department ON public.job_postings USING btree (department);


--
-- Name: idx_job_postings_status; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_job_postings_status ON public.job_postings USING btree (status);


--
-- Name: idx_languages_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_languages_employee_id ON public.employee_languages USING btree (employee_id);


--
-- Name: idx_project_achievements_project_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_project_achievements_project_id ON public.project_achievements USING btree (project_id);


--
-- Name: idx_project_links_project_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_project_links_project_id ON public.project_links USING btree (project_id);


--
-- Name: idx_project_technologies_project_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_project_technologies_project_id ON public.project_technologies USING btree (project_id);


--
-- Name: idx_projects_dates; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_projects_dates ON public.employee_projects USING btree (start_date, end_date);


--
-- Name: idx_projects_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_projects_employee_id ON public.employee_projects USING btree (employee_id);


--
-- Name: idx_publications_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_publications_employee_id ON public.employee_publications USING btree (employee_id);


--
-- Name: idx_responsibilities_work_exp_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_responsibilities_work_exp_id ON public.work_experience_responsibilities USING btree (work_experience_id);


--
-- Name: idx_soft_skills_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_soft_skills_employee_id ON public.employee_soft_skills USING btree (employee_id);


--
-- Name: idx_technical_skills_category; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_technical_skills_category ON public.employee_technical_skills USING btree (skill_category_id);


--
-- Name: idx_technical_skills_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_technical_skills_employee_id ON public.employee_technical_skills USING btree (employee_id);


--
-- Name: idx_technologies_work_exp_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_technologies_work_exp_id ON public.work_experience_technologies USING btree (work_experience_id);


--
-- Name: idx_volunteering_employee_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_volunteering_employee_id ON public.employee_volunteering USING btree (employee_id);


--
-- Name: idx_volunteering_resp_volunteering_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_volunteering_resp_volunteering_id ON public.volunteering_responsibilities USING btree (volunteering_id);


--
-- Name: idx_work_experience_dates; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX idx_work_experience_dates ON public.employee_work_experience USING btree (start_date, end_date);


--
-- Name: ix_employees_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX ix_employees_id ON public.employees USING btree (id);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: job_application_notes fk_application_notes_application; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_application_notes
    ADD CONSTRAINT fk_application_notes_application FOREIGN KEY (application_id) REFERENCES public.job_applications(id) ON DELETE CASCADE;


--
-- Name: job_application_notes fk_application_notes_author; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_application_notes
    ADD CONSTRAINT fk_application_notes_author FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: education_courses fk_education; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.education_courses
    ADD CONSTRAINT fk_education FOREIGN KEY (education_id) REFERENCES public.employee_education(id) ON DELETE CASCADE;


--
-- Name: job_applications fk_job_applications_posting; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT fk_job_applications_posting FOREIGN KEY (job_posting_id) REFERENCES public.job_postings(id) ON DELETE CASCADE;


--
-- Name: job_posting_activities fk_job_posting_activities_actor; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_activities
    ADD CONSTRAINT fk_job_posting_activities_actor FOREIGN KEY (actor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: job_posting_activities fk_job_posting_activities_posting; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_activities
    ADD CONSTRAINT fk_job_posting_activities_posting FOREIGN KEY (job_posting_id) REFERENCES public.job_postings(id) ON DELETE CASCADE;


--
-- Name: job_posting_daily_stats fk_job_posting_daily_stats_posting; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_daily_stats
    ADD CONSTRAINT fk_job_posting_daily_stats_posting FOREIGN KEY (job_posting_id) REFERENCES public.job_postings(id) ON DELETE CASCADE;


--
-- Name: job_posting_notes fk_job_posting_notes_author; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_notes
    ADD CONSTRAINT fk_job_posting_notes_author FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: job_posting_notes fk_job_posting_notes_posting; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_posting_notes
    ADD CONSTRAINT fk_job_posting_notes_posting FOREIGN KEY (job_posting_id) REFERENCES public.job_postings(id) ON DELETE CASCADE;


--
-- Name: job_postings fk_job_postings_creator; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.job_postings
    ADD CONSTRAINT fk_job_postings_creator FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: project_achievements fk_project; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.project_achievements
    ADD CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES public.employee_projects(id) ON DELETE CASCADE;


--
-- Name: project_links fk_project; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.project_links
    ADD CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES public.employee_projects(id) ON DELETE CASCADE;


--
-- Name: project_technologies fk_project; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.project_technologies
    ADD CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES public.employee_projects(id) ON DELETE CASCADE;


--
-- Name: employee_technical_skills fk_skill_category; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.employee_technical_skills
    ADD CONSTRAINT fk_skill_category FOREIGN KEY (skill_category_id) REFERENCES public.skill_categories(id) ON DELETE SET NULL;


--
-- Name: volunteering_responsibilities fk_volunteering; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.volunteering_responsibilities
    ADD CONSTRAINT fk_volunteering FOREIGN KEY (volunteering_id) REFERENCES public.employee_volunteering(id) ON DELETE CASCADE;


--
-- Name: work_experience_achievements fk_work_experience; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.work_experience_achievements
    ADD CONSTRAINT fk_work_experience FOREIGN KEY (work_experience_id) REFERENCES public.employee_work_experience(id) ON DELETE CASCADE;


--
-- Name: work_experience_responsibilities fk_work_experience; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.work_experience_responsibilities
    ADD CONSTRAINT fk_work_experience FOREIGN KEY (work_experience_id) REFERENCES public.employee_work_experience(id) ON DELETE CASCADE;


--
-- Name: work_experience_technologies fk_work_experience; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.work_experience_technologies
    ADD CONSTRAINT fk_work_experience FOREIGN KEY (work_experience_id) REFERENCES public.employee_work_experience(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict koN9K0am8hs63KTon7Wk8rjrvafQRcRiLa2JEo7p2ymni6g1egFldStgrwI5lH9


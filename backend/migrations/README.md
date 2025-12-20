# Database Migrations

This directory contains database migration scripts for the YM-491 project.

## Overview

These migrations enable the system to store complete CV data from candidates once, avoiding repeated AI API calls. When a candidate applies through the UI:

1. CV is uploaded and analyzed by n8n
2. Analyzed data is automatically saved to candidate tables
3. Application references the candidate via `candidate_id`
4. Future access to candidate data doesn't require AI API

## Migration 001: Candidate Tables

**File:** `001_create_candidate_tables.sql`

**Purpose:** Creates all necessary tables to store analyzed CV data for candidates separately from employee data. This prevents the need to call the AI API multiple times for the same candidate.

### Tables Created

#### Main Tables
- `candidates` - Main candidate information
- `candidate_personal_info` - Detailed personal information
- `candidate_addresses` - Address information
- `candidate_work_experience` - Work history
- `candidate_education` - Education history
- `candidate_technical_skills` - Technical skills
- `candidate_soft_skills` - Soft skills
- `candidate_languages` - Language proficiencies
- `candidate_certifications` - Professional certifications
- `candidate_projects` - Projects worked on
- `candidate_publications` - Publications
- `candidate_awards` - Awards and recognitions
- `candidate_volunteering` - Volunteer work
- `candidate_additional_info` - Additional information (driving license, etc.)
- `candidate_hobbies` - Hobbies and interests
- `candidate_raw_data` - Raw n8n response data (JSONB)

#### Related/Child Tables
- `candidate_work_experience_responsibilities`
- `candidate_work_experience_achievements`
- `candidate_work_experience_technologies`
- `candidate_education_courses`
- `candidate_project_technologies`
- `candidate_project_achievements`
- `candidate_project_links`
- `candidate_volunteering_responsibilities`

## Migration 002: Link Applications to Candidates

**File:** `002_add_candidate_id_to_applications.sql`

**Purpose:** Adds `candidate_id` column to `job_applications` table to link applications with candidate CV data.

### Changes Made
- Adds `candidate_id VARCHAR(50)` column to `job_applications`
- Creates index on `candidate_id` for fast lookups
- Enables linking job applications to complete candidate CV data

### Running the Migrations

#### Option 1: Using Docker (Recommended for Windows)

```bash
cd backend/migrations
run_migration.bat
```

This will run the migration via Docker on your running PostgreSQL container.

#### Option 2: Using psql directly (Linux/Mac)

```bash
cd backend/migrations
chmod +x run_migration.sh
./run_migration.sh
```

#### Option 3: Manual execution

```bash
docker exec -i ym-491-postgres-1 psql -U user -d appdb < 001_create_candidate_tables.sql
```

Or if you have direct database access:

```bash
psql -h localhost -p 5432 -U user -d appdb -f 001_create_candidate_tables.sql
```

### Verifying the Migration

After running the migration, you can verify the tables were created:

```sql
-- List all candidate tables
SELECT tablename 
FROM pg_tables 
WHERE tablename LIKE 'candidate%' 
ORDER BY tablename;

-- Check the main candidates table
SELECT * FROM candidates LIMIT 5;
```

### How It Works

#### Application Flow (UI)
1. **Candidate Applies** → User applies to a job through the UI
2. **CV Upload** → CV is uploaded and analyzed by n8n AI workflow
3. **Automatic Save** → Analyzed data is automatically saved to candidate tables
4. **Application Created** → Job application is created with `candidate_id` reference
5. **Future Access** → All candidate data can be retrieved without AI API calls

#### API Flow (Direct)
1. **Upload CV** → CV is analyzed by n8n AI workflow
2. **Analyze Response** → The n8n response is parsed and saved to candidate tables
3. **Data Persistence** → All CV data is stored in the database
4. **Reuse Data** → Future requests can retrieve candidate data without calling AI API again

### API Endpoints

After migration, these endpoints will work:

- `POST /api/io/cv/save-analyzed-cv` - Save analyzed CV to candidate tables
- `GET /api/io/cv/candidate/{candidate_id}` - Retrieve complete candidate CV data
- `POST /api/io/cv-application/analyze?save_to_db=true` - Analyze and auto-save to database

### Rollback

If you need to rollback this migration:

```sql
-- Drop all candidate tables (use with caution!)
DROP TABLE IF EXISTS candidate_raw_data CASCADE;
DROP TABLE IF EXISTS candidate_hobbies CASCADE;
DROP TABLE IF EXISTS candidate_additional_info CASCADE;
DROP TABLE IF EXISTS candidate_volunteering_responsibilities CASCADE;
DROP TABLE IF EXISTS candidate_volunteering CASCADE;
DROP TABLE IF EXISTS candidate_awards CASCADE;
DROP TABLE IF EXISTS candidate_publications CASCADE;
DROP TABLE IF EXISTS candidate_project_links CASCADE;
DROP TABLE IF EXISTS candidate_project_achievements CASCADE;
DROP TABLE IF EXISTS candidate_project_technologies CASCADE;
DROP TABLE IF EXISTS candidate_projects CASCADE;
DROP TABLE IF EXISTS candidate_certifications CASCADE;
DROP TABLE IF EXISTS candidate_languages CASCADE;
DROP TABLE IF EXISTS candidate_soft_skills CASCADE;
DROP TABLE IF EXISTS candidate_technical_skills CASCADE;
DROP TABLE IF EXISTS candidate_education_courses CASCADE;
DROP TABLE IF EXISTS candidate_education CASCADE;
DROP TABLE IF EXISTS candidate_work_experience_technologies CASCADE;
DROP TABLE IF EXISTS candidate_work_experience_achievements CASCADE;
DROP TABLE IF EXISTS candidate_work_experience_responsibilities CASCADE;
DROP TABLE IF EXISTS candidate_work_experience CASCADE;
DROP TABLE IF EXISTS candidate_addresses CASCADE;
DROP TABLE IF EXISTS candidate_personal_info CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
```

### Notes

- The migration uses `CREATE TABLE IF NOT EXISTS` so it's safe to run multiple times
- All tables have proper foreign key constraints with `ON DELETE CASCADE`
- Indexes are created for frequently queried columns
- The `candidate_id` field is VARCHAR(50) to support formats like "EMP-1766137333536"
- Raw n8n response is stored in JSONB format for future reference
- All timestamps are stored with timezone information

### Schema Details

The candidate tables mirror the employee tables structure but are completely independent. This allows:

1. Storing CV data before a candidate becomes an employee
2. Maintaining separate data lifecycles
3. Avoiding repeated AI API calls for the same candidate
4. Keeping historical CV data even if candidate doesn't get hired


@echo off
REM Run All Candidate Migrations (Windows)
REM This script applies all candidate-related migrations via Docker

echo ========================================
echo Running Candidate Migrations
echo ========================================
echo.

REM Check if migration files exist
if not exist "001_create_candidate_tables.sql" (
    echo Error: Migration file 001_create_candidate_tables.sql not found!
    exit /b 1
)

if not exist "002_add_candidate_id_to_applications.sql" (
    echo Error: Migration file 002_add_candidate_id_to_applications.sql not found!
    exit /b 1
)

echo.
echo ========================================
echo Migration 001: Creating Candidate Tables
echo ========================================
docker exec -i ym-491-postgres-1 psql -U user -d appdb < 001_create_candidate_tables.sql

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo Migration 001 failed!
    echo ========================================
    exit /b 1
)

echo ✓ Migration 001 completed successfully!
echo.
echo ========================================
echo Migration 002: Adding candidate_id to applications
echo ========================================
docker exec -i ym-491-postgres-1 psql -U user -d appdb < 002_add_candidate_id_to_applications.sql

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo Migration 002 failed!
    echo ========================================
    exit /b 1
)

echo ✓ Migration 002 completed successfully!
echo.
echo ========================================
echo All Migrations Completed Successfully!
echo ========================================
echo.
echo Created:
echo   - 20+ candidate tables for CV data storage
echo   - candidate_id column in job_applications table
echo   - All necessary indexes and foreign keys
echo.
echo Next steps:
echo   1. Restart your services: docker-compose restart
echo   2. Test by applying to a job through the UI
echo   3. Check candidates table: SELECT * FROM candidates;
echo.

pause


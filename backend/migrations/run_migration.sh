#!/bin/bash

# Run Candidate Tables Migration
# This script applies the 001_create_candidate_tables.sql migration

# Database connection parameters (adjust as needed)
DB_HOST="${DB_HOST:-postgres}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-appdb}"
DB_USER="${DB_USER:-user}"

echo "========================================" 
echo "Running Candidate Tables Migration"
echo "========================================"
echo "Database: $DB_NAME"
echo "Host: $DB_HOST:$DB_PORT"
echo "User: $DB_USER"
echo ""

# Check if migration file exists
if [ ! -f "001_create_candidate_tables.sql" ]; then
    echo "Error: Migration file 001_create_candidate_tables.sql not found!"
    exit 1
fi

# Run the migration
echo "Applying migration..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f 001_create_candidate_tables.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================" 
    echo "Migration completed successfully!"
    echo "========================================"
    echo "Created tables:"
    echo "  - candidates"
    echo "  - candidate_personal_info"
    echo "  - candidate_addresses"
    echo "  - candidate_work_experience (+ related tables)"
    echo "  - candidate_education (+ related tables)"
    echo "  - candidate_technical_skills"
    echo "  - candidate_soft_skills"
    echo "  - candidate_languages"
    echo "  - candidate_certifications"
    echo "  - candidate_projects (+ related tables)"
    echo "  - candidate_publications"
    echo "  - candidate_awards"
    echo "  - candidate_volunteering (+ related tables)"
    echo "  - candidate_additional_info"
    echo "  - candidate_hobbies"
    echo "  - candidate_raw_data"
    echo ""
else
    echo ""
    echo "========================================" 
    echo "Migration failed!"
    echo "========================================"
    echo "Please check the error messages above."
    exit 1
fi


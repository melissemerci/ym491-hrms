-- Migration: Add candidate_id to job_applications
-- Description: Adds candidate_id column to link job applications with candidate CV data
-- Date: 2025-12-19

-- Add candidate_id column to job_applications table
ALTER TABLE public.job_applications 
ADD COLUMN IF NOT EXISTS candidate_id VARCHAR(50);

-- Create index on candidate_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_job_applications_candidate_id 
ON public.job_applications(candidate_id);

-- Add comment
COMMENT ON COLUMN public.job_applications.candidate_id IS 'Reference to candidate ID in candidates table for full CV data';


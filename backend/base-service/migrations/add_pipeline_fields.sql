-- Migration: Add pipeline fields to job_applications table
-- Created: 2024-12-17

BEGIN;

-- Add pipeline stage fields
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS pipeline_stage VARCHAR(50) DEFAULT 'applied' NOT NULL,
ADD COLUMN IF NOT EXISTS pipeline_stage_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Add AI review fields
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS ai_review_result JSON,
ADD COLUMN IF NOT EXISTS ai_review_score INTEGER;

-- Add exam stage fields
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS exam_assigned BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS exam_platform_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS exam_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS exam_score INTEGER;

-- Add AI interview stage fields
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS ai_interview_scheduled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS ai_interview_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS ai_interview_type VARCHAR(20);

-- Add CV verification stage fields
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS documents_required JSON,
ADD COLUMN IF NOT EXISTS documents_submitted JSON;

-- Add proposal stage fields
ALTER TABLE job_applications 
ADD COLUMN IF NOT EXISTS proposal_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS proposal_accepted BOOLEAN;

-- Create index on pipeline_stage for better query performance
CREATE INDEX IF NOT EXISTS idx_job_applications_pipeline_stage 
ON job_applications(pipeline_stage);

-- Update existing records based on current status
-- Map old status to new pipeline_stage
UPDATE job_applications 
SET pipeline_stage = CASE 
    WHEN status = 'New' THEN 'applied'
    WHEN status = 'Shortlisted' THEN 'ai_review'
    WHEN status = 'Interview' THEN 'ai_interview'
    WHEN status = 'Hired' THEN 'proposal'
    WHEN status = 'Rejected' THEN 'applied'
    ELSE 'applied'
END
WHERE pipeline_stage = 'applied';

COMMIT;



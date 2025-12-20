# Job Application Pipeline System

## Overview

The Job Application Pipeline System is a comprehensive recruitment workflow that guides candidates through 6 evaluation stages from application to job offer. The system features hybrid progression logic, AI-powered candidate matching, and automated document verification.

## Pipeline Stages

### 1. Apply (applied)
- **Description**: Initial application submission
- **Progression**: Manual → AI Review
- **Features**:
  - Candidate information collection
  - Resume upload
  - Initial screening

### 2. AI Review (ai_review)
- **Description**: AI-powered candidate matching analysis
- **Progression**: Manual → Exam (after approval)
- **Features**:
  - Automated CV analysis
  - Match score (0-100)
  - Strengths and concerns identification
  - Requirements matching
  - **Integration**: Calls AI service for analysis

### 3. Exam (exam)
- **Description**: Technical assessment assignment
- **Progression**: Automatic → AI Interview (after completion)
- **Features**:
  - External exam platform integration (placeholder)
  - Exam assignment and tracking
  - Score recording
  - Automatic advancement on passing score

### 4. AI Interview (ai_interview)
- **Description**: AI-powered video or voice interview
- **Progression**: Manual → CV Verification (after review)
- **Features**:
  - Interview type selection (video/voice)
  - Scheduling interface
  - Status tracking
  - **Future**: Integration with AI interview platforms

### 5. CV Verification (cv_verification)
- **Description**: Document collection and verification
- **Progression**: Automatic → Proposal (when all documents submitted)
- **Features**:
  - Document checklist management
  - Upload tracking
  - Required/optional documents
  - Integration with Firebase storage

### 6. Proposal (proposal)
- **Description**: Job offer presentation
- **Progression**: Final stage
- **Features**:
  - Salary offer specification
  - Benefits package
  - Start date setting
  - Acceptance/rejection tracking

## Hybrid Progression Logic

The system implements hybrid progression with both automatic and manual stage transitions:

- **Automatic Transitions**:
  - Applied → AI Review (when AI analysis completes)
  - Exam → AI Interview (when exam is passed)
  - CV Verification → Proposal (when all documents are verified)

- **Manual Transitions**:
  - AI Review → Exam (admin approval required)
  - AI Interview → CV Verification (admin review required)

## Technical Architecture

### Backend Components

#### Database Schema
- **Table**: `job_applications`
- **New Fields**:
  - `pipeline_stage`: Current stage
  - `pipeline_stage_updated_at`: Last stage update
  - `ai_review_result`: JSON field with AI analysis
  - `ai_review_score`: Match score (0-100)
  - `exam_*`: Exam-related fields
  - `ai_interview_*`: Interview-related fields
  - `documents_*`: Verification documents
  - `proposal_*`: Proposal status

#### API Endpoints
Base URL: `/api/base/recruitment`

1. `GET /jobs/{job_id}/pipeline/{stage}` - Get applications by stage
2. `POST /applications/{app_id}/pipeline/advance` - Move to next stage
3. `POST /applications/{app_id}/trigger-ai-review` - Trigger AI analysis
4. `POST /applications/{app_id}/ai-review` - Update AI review results
5. `POST /applications/{app_id}/assign-exam` - Assign exam
6. `POST /applications/{app_id}/exam-results` - Update exam results (webhook)
7. `POST /applications/{app_id}/schedule-interview` - Schedule interview
8. `POST /applications/{app_id}/documents` - Update documents
9. `POST /applications/{app_id}/send-proposal` - Send job proposal

#### AI Service Integration
- **Endpoint**: `POST /api/ai/generate/cv-review`
- **Purpose**: Analyze candidate CV against job requirements
- **Returns**: Score, explanation, strengths, concerns, matched/missing requirements

### Frontend Components

#### Main Components
- `PipelineTab.tsx`: Main pipeline interface with stage tabs
- Stage Components:
  - `ApplyStage.tsx`
  - `AIReviewStage.tsx`
  - `ExamStage.tsx`
  - `AIInterviewStage.tsx`
  - `CVVerificationStage.tsx`
  - `ProposalStage.tsx`

#### Shared Components
- `StageCard.tsx`: Reusable application card
- `StageActions.tsx`: Action buttons (approve, reject, advance)
- `ProgressIndicator.tsx`: Visual progress bar

#### React Query Hooks
- `usePipelineApplications`: Fetch applications by stage
- `useAdvanceApplication`: Move to next stage
- `useTriggerAIReview`: Trigger AI analysis
- `useAssignExam`: Assign exam
- `useScheduleInterview`: Schedule interview
- `useUpdateDocuments`: Update documents
- `useSendProposal`: Send proposal

## Usage Guide

### For Administrators

1. **Review New Applications**:
   - Navigate to Pipeline tab
   - Select "Apply" stage
   - Click "Start AI Review" to trigger automated analysis

2. **Review AI Results**:
   - Switch to "AI Review" stage
   - Expand details to see strengths/concerns
   - Click "Proceed to Exam" if suitable

3. **Assign Technical Exam**:
   - In "Exam" stage
   - Click "Assign Exam"
   - Enter external platform details
   - System auto-advances on completion

4. **Schedule Interview**:
   - In "AI Interview" stage
   - Choose video or voice interview
   - Select date/time
   - Review after completion

5. **Verify Documents**:
   - In "CV Verification" stage
   - Review document checklist
   - Track submission status
   - System auto-advances when complete

6. **Send Job Offer**:
   - In "Proposal" stage
   - Fill in salary, start date, benefits
   - Click "Send Proposal"
   - Track acceptance status

### For Candidates (Future Integration)

- Receive email notifications at each stage
- Access candidate portal to:
  - Complete assigned exams
  - Join AI interviews
  - Upload required documents
  - Accept/reject job proposals

## Database Migration

To add pipeline fields to existing database:

```bash
# Run migration
psql -U user -d app_db -f backend/base-service/migrations/add_pipeline_fields.sql
```

Or rebuild from updated `init.sql`:

```bash
docker-compose down -v
docker-compose up -d postgres
# Wait for postgres to be ready
docker-compose up -d
```

## Future Enhancements

1. **External Exam Platform Integration**
   - HackerRank, CodeSignal, TestGorilla APIs
   - Automatic score retrieval
   - Custom test creation

2. **AI Interview Platform**
   - Video interview recording/analysis
   - Real-time voice chat AI
   - Sentiment analysis
   - Question adaptation

3. **Document Verification**
   - OCR for document parsing
   - Identity verification services
   - Background check integration

4. **Analytics Dashboard**
   - Pipeline conversion rates
   - Time-in-stage metrics
   - Drop-off analysis
   - Candidate quality scores

5. **Candidate Portal**
   - Self-service application status
   - Direct communication
   - Task completion tracking
   - Mobile app support

## Troubleshooting

### AI Review Not Triggering
- Check AI service is running: `docker-compose ps ai-service`
- Verify network connectivity between services
- Check logs: `docker-compose logs ai-service`

### Applications Not Advancing
- Verify pipeline_stage field in database
- Check backend logs for errors
- Ensure required fields are populated

### Frontend Not Loading Pipeline
- Check browser console for errors
- Verify API endpoints are accessible
- Clear browser cache
- Check React Query devtools

## Configuration

### Environment Variables

Backend (base-service):
```env
DATABASE_URL=postgresql://user:password@postgres:5432/app_db
AI_SERVICE_URL=http://ai-service:8000
```

AI Service:
```env
GOOGLE_API_KEY=your_gemini_api_key
```

Frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost
```

## Support

For issues or questions:
1. Check logs: `docker-compose logs [service-name]`
2. Review database state
3. Verify API responses
4. Check frontend console
5. Review this documentation

## License

Internal use only.



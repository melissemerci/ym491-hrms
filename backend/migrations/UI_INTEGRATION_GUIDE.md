# UI Integration Guide - Candidate CV Storage

## Problem Fixed

When candidates applied through the UI, their analyzed CV data wasn't being saved to the candidate tables, even though the application was submitted successfully. This meant:
- ❌ CV data was lost after analysis
- ❌ Would need to call AI API again for the same candidate
- ❌ Wasted API costs and time

## Solution Implemented

The system now automatically saves candidate CV data when they apply through the UI.

### Changes Made

#### 1. Database Schema (`002_add_candidate_id_to_applications.sql`)
- Added `candidate_id` column to `job_applications` table
- Links each application to complete candidate CV data
- Indexed for fast lookups

#### 2. Backend Models (`backend/base-service/app/models/recruitment.py`)
```python
class JobApplication(Base):
    # ... existing fields ...
    candidate_id = Column(String(50), index=True)  # NEW FIELD
```

#### 3. API Schema (`backend/base-service/app/schemas/recruitment.py`)
```python
class JobApplicationCreate(JobApplicationBase):
    job_posting_id: int
    analyzed_cv_data: Optional[Dict[str, Any]] = None  # NEW FIELD
```

#### 4. Application Creation Logic (`backend/base-service/app/routers/recruitment.py`)
The `create_application` endpoint now:
1. Accepts `analyzed_cv_data` from frontend
2. Calls io-service to save candidate data
3. Stores `candidate_id` in the application
4. Links application to candidate CV data

```python
async def create_application(application: JobApplicationCreate, db: Session):
    # ... validate job ...
    
    # Save candidate CV data if provided
    if application.analyzed_cv_data:
        # Call io-service to save
        response = await client.post(
            "http://io-service:8000/api/io/cv/save-analyzed-cv",
            json=analyzed_cv_data
        )
        candidate_id = response.json().get("candidate_id")
    
    # Create application with candidate_id reference
    db_app = JobApplication(**app_data, candidate_id=candidate_id)
    # ...
```

## How to Deploy

### Step 1: Run Migrations

```bash
cd backend/migrations
run_migration.bat
```

This will:
1. ✅ Create all candidate tables (if not exists)
2. ✅ Add `candidate_id` column to `job_applications`
3. ✅ Create necessary indexes

### Step 2: Restart Services

```bash
docker-compose restart base-service io-service
```

### Step 3: Test the Flow

1. **Open the UI** → Navigate to a job posting
2. **Apply for Job** → Fill in the application form
3. **Upload CV** → Upload a PDF CV file
4. **Submit Application** → Complete the submission

### Step 4: Verify Data Saved

```sql
-- Check candidates table
SELECT candidate_id, full_name, email, completeness_score 
FROM candidates 
ORDER BY created_at DESC 
LIMIT 5;

-- Check application link
SELECT 
    ja.id, 
    ja.candidate_name, 
    ja.candidate_id, 
    c.full_name as cv_full_name,
    c.completeness_score
FROM job_applications ja
LEFT JOIN candidates c ON c.candidate_id = ja.candidate_id
ORDER BY ja.applied_at DESC
LIMIT 5;
```

Expected result: You should see:
- ✅ New record in `candidates` table with all CV data
- ✅ Application has `candidate_id` that matches candidate
- ✅ Can query candidate data without re-analyzing CV

## Data Flow Diagram

```
┌─────────────────┐
│   UI - User     │
│  Applies to Job │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  1. Upload CV (PDF)     │
│  2. n8n Analyzes CV     │
│  3. Return analyzed data│
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Frontend - Create Application          │
│  POST /api/base/recruitment/applications│
│  {                                       │
│    candidate_name: "...",                │
│    email: "...",                         │
│    analyzed_cv_data: { ... }  ← NEW     │
│  }                                       │
└────────┬────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Base-Service                            │
│  create_application()                    │
│  ├─ Calls io-service to save CV data    │
│  ├─ Gets back candidate_id               │
│  └─ Creates application with reference   │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  IO-Service                              │
│  save_analyzed_cv()                      │
│  ├─ Parses n8n response                  │
│  ├─ Saves to 20+ candidate tables        │
│  │   • personal_info                     │
│  │   • work_experience                   │
│  │   • education                         │
│  │   • skills                            │
│  │   • projects                          │
│  │   • ... etc                           │
│  └─ Returns candidate_id                 │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Database                                │
│  ├─ candidates (main record)             │
│  ├─ candidate_* (all CV data)            │
│  └─ job_applications.candidate_id = ref  │
└──────────────────────────────────────────┘
```

## Frontend Changes Needed

⚠️ **IMPORTANT**: The frontend must pass `analyzed_cv_data` when creating an application.

### Check if Frontend is Updated

Look for this in `client/src/features/applications/`:

```typescript
// Should include analyzed_cv_data
const applicationData = {
  job_posting_id: jobId,
  candidate_name: formData.name,
  email: formData.email,
  phone: formData.phone,
  resume_url: fileUrl,
  analyzed_cv_data: analyzedData,  // ← Must include this
  // ... other fields
};

await applicationsApi.createApplication(applicationData);
```

If this is missing, the candidate data won't be saved!

## Troubleshooting

### Issue: Candidates table is still empty after applying

**Check 1**: Is `analyzed_cv_data` being passed from frontend?
```javascript
// In browser console, check the network request
// POST /api/base/recruitment/applications
// Body should include: analyzed_cv_data: { ... }
```

**Check 2**: Is io-service running?
```bash
docker ps | grep io-service
curl http://localhost/api/io/cv-application/health
```

**Check 3**: Check base-service logs
```bash
docker logs ym-491-base-service-1 --tail=100
# Look for: "Candidate CV data saved with ID: ..."
```

**Check 4**: Check io-service logs
```bash
docker logs ym-491-io-service-1 --tail=100
# Look for: "Saving CV data for candidate_id: ..."
```

### Issue: Application created but candidate_id is null

This means:
- ✅ Frontend sent `analyzed_cv_data`
- ❌ io-service failed to save it

Check io-service logs for errors.

### Issue: "Failed to save candidate CV data"

Possible causes:
1. **Migration not run**: Run `run_migration.bat`
2. **Service can't connect**: Check Docker network
3. **Invalid data format**: Check n8n response format

## Benefits After This Fix

✅ **Cost Savings**: No repeated AI API calls for same candidate
✅ **Performance**: Instant access to candidate data
✅ **Data Persistence**: All CV information stored permanently
✅ **Better UX**: Faster application processing
✅ **Analytics**: Can query candidate database for insights

## Next Steps

After verifying this works:

1. **Add Candidate View** in UI to show saved CV data
2. **Link to Application** to quickly view candidate details
3. **Deduplicate Candidates** by email to avoid duplicates
4. **Export Candidates** for external ATS systems

## Support

If you encounter issues:
1. Check this guide's Troubleshooting section
2. Review migration files in `backend/migrations/`
3. Check service logs for specific errors
4. Verify database schema matches models


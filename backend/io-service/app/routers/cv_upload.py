import json
import os
import re
import uuid
import hashlib
from datetime import datetime
from pathlib import Path
from typing import Optional
import httpx
import requests
import redis
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
import logging

from ..schemas.cv_upload import (
    UploadAndCheckResponse,
    CoverageResponse,
    CoverageBreakdown,
    CoverageDetails,
    MissingFieldsDetail,
    AnalyzedCVResponse,
)

# Create uploads directory
UPLOAD_DIR = Path("/app/cv-uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Redis
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
try:
    redis_client = redis.from_url(REDIS_URL, decode_responses=True)
    logger.info(f"Connected to Redis at {REDIS_URL}")
except Exception as e:
    logger.error(f"Failed to connect to Redis: {e}")
    redis_client = None

router = APIRouter(
    prefix="/cv-application",
    tags=["cv-application"],
    responses={404: {"description": "Not found"}},
)

# n8n Webhook URLs
N8N_COVER_RATE_URL = "https://n8n.douloop.com/webhook/cv-cover-rate"
N8N_ANALYZE_URL = "https://n8n.douloop.com/webhook/upload-cv"


def parse_coverage_response(response_data) -> CoverageResponse:
    """Parse the coverage response from n8n webhook (supports both direct and Gemini format)."""
    try:
        logger.info(f"Parsing coverage response, type: {type(response_data)}")
        
        # Handle string response (parse as JSON)
        if isinstance(response_data, str):
            response_data = json.loads(response_data)
            logger.info(f"Parsed string to JSON, type: {type(response_data)}")
        
        # Handle list response (take first element)
        if isinstance(response_data, list) and len(response_data) > 0:
            response_data = response_data[0]
            logger.info(f"Extracted first element from list")
        
        logger.info(f"Response data keys: {response_data.keys() if isinstance(response_data, dict) else 'not a dict'}")
        
        # Check if response is direct coverage format (has cover_rate key)
        if isinstance(response_data, dict) and "cover_rate" in response_data:
            logger.info("Response is in direct coverage format")
            coverage_data = response_data
        # Otherwise, try Gemini format (has candidates key)
        elif isinstance(response_data, dict) and "candidates" in response_data:
            logger.info("Response is in Gemini format, extracting...")
            candidates = response_data.get("candidates", [])
            if not candidates:
                raise ValueError("No candidates in Gemini response")
            
            text_content = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
            
            # Extract JSON from markdown code block if present
            json_match = re.search(r'```json\s*([\s\S]*?)\s*```', text_content)
            if json_match:
                json_str = json_match.group(1)
            else:
                json_str = text_content
            
            coverage_data = json.loads(json_str)
        else:
            raise ValueError(f"Unknown response format. Keys: {response_data.keys() if isinstance(response_data, dict) else 'not a dict'}")
        
        # Parse breakdown
        breakdown_data = coverage_data.get("breakdown", {})
        breakdown = CoverageBreakdown(**breakdown_data)
        
        # Parse details
        details_data = coverage_data.get("details", {})
        details_parsed = {}
        for key, value in details_data.items():
            if isinstance(value, dict):
                details_parsed[key] = MissingFieldsDetail(
                    awarded_fields=value.get("awarded_fields", []),
                    missing_fields=value.get("missing_fields", [])
                )
        details = CoverageDetails(**details_parsed)
        
        return CoverageResponse(
            cover_rate=coverage_data.get("cover_rate", 0),
            breakdown=breakdown,
            details=details,
            file_url=""  # Will be set by caller
        )
    except Exception as e:
        logger.error(f"Error parsing coverage response: {e}")
        raise ValueError(f"Failed to parse coverage response: {str(e)}")


def parse_analyze_response(response_data: dict) -> dict:
    """Parse the analyze response from n8n webhook."""
    try:
        # The response should be a list with the analyzed data
        if isinstance(response_data, list) and len(response_data) > 0:
            analyzed_data = response_data[0]
        else:
            analyzed_data = response_data
        
        # Parse JSON string fields to actual objects
        json_fields = [
            'work_experience',
            'education_details',
            'projects',
            'volunteering',
            'raw_structured_data'
        ]
        
        for field in json_fields:
            if field in analyzed_data and isinstance(analyzed_data[field], str):
                try:
                    analyzed_data[field] = json.loads(analyzed_data[field])
                except json.JSONDecodeError as e:
                    logger.warning(f"Failed to parse {field} JSON: {e}")
                    analyzed_data[field] = None
        
        return analyzed_data
    except Exception as e:
        logger.error(f"Error parsing analyze response: {e}")
        raise ValueError(f"Failed to parse analyze response: {str(e)}")


@router.post("/upload-and-check", response_model=UploadAndCheckResponse)
async def upload_and_check_coverage(
    file: UploadFile = File(...),
):
    """
    Upload CV to local storage and check coverage rate via n8n webhook.
    
    Returns the file URL and coverage analysis including missing fields.
    Caches result for 15 minutes to prevent redundant processing.
    """
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    file_url = ""
    try:
        # Generate unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
        filename = f"{timestamp}_{unique_id}_{safe_filename}"
        file_path = UPLOAD_DIR / filename
        
        # Read file content
        file_content = await file.read()
        
        # Calculate file hash for caching
        file_hash = hashlib.sha256(file_content).hexdigest()
        cache_key = f"cv_coverage:{file_hash}"
        
        # Check cache if Redis is available
        if redis_client:
            cached_data = redis_client.get(cache_key)
            if cached_data:
                logger.info(f"Cache hit for file hash: {file_hash}")
                cached_response = json.loads(cached_data)
                
                # We need to save the file even if cached, because subsequent steps might need it
                # But we can use the old filename if we stored it, or just save it again
                # For simplicity, we save it again with new name and return that URL
                with open(file_path, "wb") as f:
                    f.write(file_content)
                
                # Update file_url in cached response
                file_url = f"/api/io/cv-application/files/{filename}"
                cached_response["file_url"] = file_url
                cached_response["coverage"]["file_url"] = file_url
                
                return UploadAndCheckResponse(**cached_response)
        
        # Save to local storage
        with open(file_path, "wb") as f:
            f.write(file_content)
        
        # Generate URL for accessing the file
        file_url = f"/api/io/cv-application/files/{filename}"
        
        logger.info(f"CV saved locally: {file_path}")
        
        # Call n8n cover-rate webhook using requests (matches curl behavior exactly)
        original_filename = file.filename or "cv.pdf"
        
        logger.info(f"Sending CV to n8n cover-rate webhook: {N8N_COVER_RATE_URL}")
        logger.info(f"File size: {len(file_content)} bytes, filename: {original_filename}")
        
        # Use requests library for file upload (matches curl --form behavior)
        files_payload = {
            "file": (original_filename, file_content, "application/pdf")
        }
        
        try:
            response = requests.post(
                N8N_COVER_RATE_URL,
                files=files_payload,
                timeout=300  # 5 min timeout
            )
            
            logger.info(f"n8n response status: {response.status_code}")
            
            if response.status_code != 200:
                logger.error(f"n8n cover-rate webhook error: {response.status_code} - {response.text}")
                return UploadAndCheckResponse(
                    success=False,
                    file_url=file_url,
                    error=f"Coverage check failed: {response.text}"
                )
            
            # Get raw response and parse manually for debugging
            raw_text = response.text
            logger.info(f"n8n raw response length: {len(raw_text)}")
            logger.info(f"n8n raw response: {raw_text[:1000]}")
            
            response_data = json.loads(raw_text)
            logger.info(f"Parsed JSON type: {type(response_data)}, is_list: {isinstance(response_data, list)}")
            
        except requests.Timeout:
            logger.error("n8n webhook timeout (requests)")
            return UploadAndCheckResponse(
                success=False,
                file_url=file_url,
                error="Coverage check timed out. Please try again."
            )
        except json.JSONDecodeError as e:
            logger.error(f"JSON parse error: {e}")
            return UploadAndCheckResponse(
                success=False,
                file_url=file_url,
                error=f"Invalid response from n8n: {str(e)}"
            )
            
        # Parse the coverage response
        coverage = parse_coverage_response(response_data)
        coverage.file_url = file_url
        
        result = UploadAndCheckResponse(
            success=True,
            file_url=file_url,
            coverage=coverage
        )
        
        # Cache result if Redis is available (30 mins = 1800 seconds)
        if redis_client:
            try:
                # We store the dict representation
                redis_client.setex(
                    cache_key,
                    1800, # 30 minutes
                    result.json()
                )
                logger.info(f"Cached result for file hash: {file_hash}")
            except Exception as e:
                logger.error(f"Failed to cache result: {e}")
        
        return result
            
    except Exception as e:
        logger.error(f"Error in upload_and_check_coverage: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/files/{filename}")
async def get_uploaded_file(filename: str):
    """Serve uploaded CV files."""
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, media_type="application/pdf", filename=filename)


@router.post("/analyze", response_model=AnalyzedCVResponse)
async def analyze_cv(
    file_url: str = Form(...),
    additional_fields: Optional[str] = Form(None),  # JSON string of additional fields
    save_to_db: bool = Form(False),  # Whether to save to database automatically
):
    """
    Send CV to n8n analyzer webhook and get standardized CV data.
    
    Optionally includes additional fields provided by the user.
    Optionally saves the analyzed data to the database if save_to_db is True.
    """
    try:
        # Parse additional fields if provided
        extra_data = {}
        if additional_fields:
            try:
                extra_data = json.loads(additional_fields)
            except json.JSONDecodeError:
                logger.warning("Failed to parse additional_fields JSON")
        
        # Extract filename from URL and read from local storage
        filename = file_url.split("/")[-1].split("?")[0]
        file_path = UPLOAD_DIR / filename
        
        if not file_path.exists():
            raise HTTPException(status_code=400, detail="CV file not found in storage")
        
        with open(file_path, "rb") as f:
            file_content = f.read()
        
        # Send to n8n analyze webhook using requests (matches curl behavior)
        logger.info(f"Sending CV to n8n analyze webhook: {N8N_ANALYZE_URL}")
        
        files_payload = {"file": (filename, file_content, "application/pdf")}
        
        # Include additional fields as form data if provided
        data = {}
        if extra_data:
            data["additional_fields"] = json.dumps(extra_data)
        
        try:
            response = requests.post(
                N8N_ANALYZE_URL,
                files=files_payload,
                data=data if data else None,
                timeout=300  # 5 min timeout
            )
            
            if response.status_code != 200:
                logger.error(f"n8n analyze webhook error: {response.status_code} - {response.text}")
                return AnalyzedCVResponse(
                    success=False,
                    error=f"CV analysis failed: {response.text}"
                )
            
            response_data = response.json()
            logger.info("n8n analyze response received")
            
            # Parse the analyze response
            analyzed_data = parse_analyze_response(response_data)
            
            # Merge additional fields into analyzed data if provided
            if extra_data:
                # Update raw_structured_data with additional fields
                raw_data = analyzed_data.get("raw_structured_data", {})
                if isinstance(raw_data, str):
                    raw_data = json.loads(raw_data)
                
                # Merge additional info
                additional_info = raw_data.get("additional_information", {})
                if "driving_license" in extra_data:
                    additional_info["driving_license"] = extra_data["driving_license"]
                if "military_status" in extra_data:
                    additional_info["military_status"] = extra_data["military_status"]
                if "availability" in extra_data:
                    additional_info["availability"] = extra_data["availability"]
                if "willing_to_relocate" in extra_data:
                    additional_info["willing_to_relocate"] = extra_data["willing_to_relocate"]
                if "willing_to_travel" in extra_data:
                    additional_info["willing_to_travel"] = extra_data["willing_to_travel"]
                if "hobbies" in extra_data:
                    additional_info["hobbies"] = extra_data["hobbies"]
                
                raw_data["additional_information"] = additional_info
                analyzed_data["raw_structured_data"] = raw_data
                
                # Update top-level fields
                if "city" in extra_data or "country" in extra_data:
                    analyzed_data["location"] = f"{extra_data.get('city', '')}, {extra_data.get('country', '')}".strip(", ")
                if "languages" in extra_data:
                    analyzed_data["languages"] = ", ".join(extra_data["languages"]) if isinstance(extra_data["languages"], list) else extra_data["languages"]
            
            # Optionally save to database
            candidate_id = None
            if save_to_db:
                try:
                    from ..database import get_db
                    db_gen = get_db()
                    db = next(db_gen)
                    
                    # Import the save function from cv router
                    from .cv import save_analyzed_cv
                    
                    result = save_analyzed_cv(analyzed_data, db)
                    candidate_id = result.get("candidate_id")
                    logger.info(f"CV data saved to database with candidate_id: {candidate_id}")
                    
                except Exception as save_error:
                    logger.error(f"Failed to save CV to database: {save_error}")
                    # Don't fail the whole request if save fails
                finally:
                    try:
                        db_gen.close()
                    except:
                        pass

            return AnalyzedCVResponse(
                success=True,
                data={
                    **analyzed_data,
                    "saved_to_db": save_to_db,
                    "db_candidate_id": candidate_id if candidate_id else None
                }
            )
            
        except requests.Timeout:
            logger.error("n8n analyze webhook timeout")
            return AnalyzedCVResponse(
                success=False,
                error="CV analysis timed out. Please try again."
            )
            
    except Exception as e:
        logger.error(f"Error in analyze_cv: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    """Health check endpoint for CV application service."""
    return {"status": "healthy", "service": "cv-application", "redis": "connected" if redis_client else "disconnected"}

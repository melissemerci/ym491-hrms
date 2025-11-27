from fastapi import APIRouter, HTTPException, status
from ..schemas.ai import AIRequest, AIResponse
from ..services.ai_worker import ai_worker

router = APIRouter(
    prefix="/generate",
    tags=["ai"]
)

@router.post("/", response_model=AIResponse)
async def generate_content(request: AIRequest):
    try:
        content = await ai_worker.process_task(
            task_type=request.task_type,
            prompt=request.prompt,
            **(request.parameters or {})
        )
        return AIResponse(content=content)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


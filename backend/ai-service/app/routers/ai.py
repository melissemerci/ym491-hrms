from fastapi import APIRouter, HTTPException, status, Depends
from ..schemas.ai import AIRequest, AIResponse
from ..services.ai_worker import ai_worker
from ..dependencies import RoleChecker
from ..models.role import UserRole

router = APIRouter(
    prefix="/generate",
    tags=["ai"]
)

allow_any_authenticated_user = Depends(RoleChecker([UserRole.ADMIN, UserRole.USER]))

@router.post("/", response_model=AIResponse, dependencies=[allow_any_authenticated_user])
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


from enum import Enum
from typing import Optional, Dict, Any
from pydantic import BaseModel

class TaskType(str, Enum):
    CHAT = "chat"
    SUMMARIZATION = "summarization"
    GENERIC = "generic"

class AIRequest(BaseModel):
    prompt: str
    task_type: TaskType = TaskType.GENERIC
    parameters: Optional[Dict[str, Any]] = None

class AIResponse(BaseModel):
    content: str
    metadata: Optional[Dict[str, Any]] = None


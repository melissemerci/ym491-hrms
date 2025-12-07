from typing import Dict
from ..schemas.ai import TaskType
from .llm_provider import LLMProvider
from .gemini_provider import GeminiProvider

class AIWorker:
    def __init__(self):
        self.providers: Dict[str, LLMProvider] = {}
        # Register default provider
        self.register_provider("default", GeminiProvider())

    def register_provider(self, name: str, provider: LLMProvider):
        self.providers[name] = provider

    def get_provider(self, task_type: TaskType) -> LLMProvider:
        # Simple routing logic - can be expanded based on task requirements
        # For now, we use the default provider (Gemini) for all tasks
        return self.providers.get("default")

    async def process_task(self, task_type: TaskType, prompt: str, **kwargs) -> str:
        provider = self.get_provider(task_type)
        if not provider:
            raise ValueError(f"No provider found for task type: {task_type}")
        
        return await provider.generate_content(prompt, **kwargs)

# Global instance
ai_worker = AIWorker()


from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

class LLMProvider(ABC):
    @abstractmethod
    async def generate_content(self, prompt: str, **kwargs) -> str:
        """
        Generate content based on the prompt.
        """
        pass
    
    @abstractmethod
    def get_provider_name(self) -> str:
        """
        Return the name of the provider.
        """
        pass


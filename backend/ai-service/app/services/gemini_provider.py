import google.generativeai as genai
import re
from ..core.config import settings
from .llm_provider import LLMProvider

class GeminiProvider(LLMProvider):
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)

    async def generate_content(self, prompt: str, **kwargs) -> str:
        try:
            response = self.model.generate_content(prompt, **kwargs)
            return self._clean_response(response.text)
        except Exception as e:
            # Handle API errors gracefully
            raise Exception(f"Gemini API Error: {str(e)}")

    def _clean_response(self, text: str) -> str:
        # Extract content from markdown code blocks if present
        pattern = r"```(?:json)?\s*(.*?)\s*```"
        match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        if match:
            text = match.group(1)
        
        # Strip leading/trailing whitespace
        return text.strip()

    def get_provider_name(self) -> str:
        return "gemini"


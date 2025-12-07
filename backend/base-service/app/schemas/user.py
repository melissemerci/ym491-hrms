from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

from ..models.role import UserRole

# Base schema (common attributes)
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: Optional[bool] = True
    role: UserRole = UserRole.USER

# Schema for creating a user (Input DTO)
class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=72)

# Schema for reading a user (Output DTO)
class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Schema for login token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None


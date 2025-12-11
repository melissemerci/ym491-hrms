from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from .core.security import SECRET_KEY, ALGORITHM
from .models.role import UserRole
import requests
import os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

# Base service URL for user validation
BASE_SERVICE_URL = os.getenv("BASE_SERVICE_URL", "http://base-service:8000")

class UserData:
    def __init__(self, email: str, role: UserRole, is_active: bool):
        self.email = email
        self.role = role
        self.is_active = is_active

def get_current_user(token: str = Depends(oauth2_scheme)) -> UserData:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Validate user with base-service
    try:
        response = requests.get(
            f"{BASE_SERVICE_URL}/auth/me",
            headers={"Authorization": f"Bearer {token}"},
            timeout=5
        )
        if response.status_code != 200:
            raise credentials_exception
        
        user_data = response.json()
        return UserData(
            email=user_data["email"],
            role=UserRole(user_data["role"]),
            is_active=user_data["is_active"]
        )
    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Authentication service unavailable: {str(e)}"
        )

def get_current_active_user(current_user: UserData = Depends(get_current_user)) -> UserData:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

class RoleChecker:
    def __init__(self, allowed_roles: list[UserRole]):
        self.allowed_roles = allowed_roles

    def __call__(self, user: UserData = Depends(get_current_active_user)):
        if user.role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail="Operation not permitted"
            )

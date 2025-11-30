from typing import Union
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import text
from .database import get_db, engine
from .models import user as user_model
from .schemas.user import UserCreate, Token
from .services.auth_service import AuthService
from .routers import employee_router

user_model.Base.metadata.create_all(bind=engine)

app = FastAPI(root_path="/base")


app.include_router(employee_router.router) 


@app.get("/")
def read_root():
    return {"Hello": "World from Base Service"}


@app.get("/db-check")
def check_db_connection(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "success", "message": "Connected to PostgreSQL"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    return auth_service.register_user(user)


@app.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    return auth_service.authenticate_user(form_data.username, form_data.password)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
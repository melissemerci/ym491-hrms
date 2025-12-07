from typing import Union
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from .database import get_db, engine
from .models import user as user_model
from .routers import employee_router, auth
from fastapi.middleware.cors import CORSMiddleware

user_model.Base.metadata.create_all(bind=engine)

app = FastAPI(root_path="/api/base")

app.include_router(auth.router)
app.include_router(employee_router.router) 

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
        allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)

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

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

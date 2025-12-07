from typing import Union
from fastapi import FastAPI
from .firebase import get_firestore_client

app = FastAPI(root_path="/api/io")


@app.get("/")
def read_root():
    return {"Hello": "World from IO Service"}


@app.get("/firebase-check")
def check_firebase_connection():
    db = get_firestore_client()
    if db:
        return {"status": "success", "message": "Firebase SDK initialized"}
    else:
        return {"status": "warning", "message": "Firebase SDK not initialized (missing credentials?)"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

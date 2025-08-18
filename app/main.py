from fastapi import FastAPI, Depends
from app.database import Base, engine

from app.models.user import User
from app.models.post import Post
from app.models.user_likes_post import user_likes_post

Base.metadata.create_all(bind=engine)
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}
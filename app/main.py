from fastapi import FastAPI, Depends
from app.database import Base, engine
from app.routers import user_router

from app.models.user import User
from app.models.post import Post
from app.models.user_likes_post import user_likes_post

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(user_router.router)
@app.get("/")
async def root():
    return {"message": "Hello World"}
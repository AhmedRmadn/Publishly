from fastapi import FastAPI, Depends
from app.database import Base, engine
from app.routers import user_router
from fastapi.staticfiles import StaticFiles
from app.models.user import User
from app.models.post import Post
from app.models.user_likes_post import user_likes_post

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(user_router.router)

app.mount("/app/images", StaticFiles(directory="app/images"), name="images")
@app.get("/")
async def root():
    return {"message": "Hello World"}
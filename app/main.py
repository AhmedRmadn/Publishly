from fastapi import FastAPI
from app.database import Base, engine
from app.routers import user_router
from app.routers import article_router
from fastapi.staticfiles import StaticFiles
from app.models.user import User
from app.models.article import Article
from app.models.user_likes_article import user_likes_article
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = [
    "http://localhost:5173",  # React/Next.js local dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allowed domains
    allow_credentials=True,           # Allow cookies/auth headers
    allow_methods=["*"],              # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],              # Allow all headers
)

app.include_router(user_router.router)
app.include_router(article_router.router)
app.mount("/app/images", StaticFiles(directory="app/images"), name="images")
@app.get("/")
async def root():
    return {"message": "Hello World"}
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import user_router, article_router, like_router

# --- 1. Robust Path Handling ---
# Calculate the absolute path to the 'app/images' directory.
# This ensures it works regardless of where you run the 'uvicorn' command from (Docker or Local).
BASE_DIR = Path(__file__).resolve().parent
IMAGES_DIR = BASE_DIR / "images"

# --- 2. Lifespan Manager (Modern FastAPI) ---
# This replaces the global 'Base.metadata.create_all()' call.
# It ensures the DB and folders are ready BEFORE the app starts accepting requests.
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    Base.metadata.create_all(bind=engine)
    
    # Startup: Ensure the images directory exists
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    print(f"📁 Verified images directory at: {IMAGES_DIR}")
    
    yield
    # Shutdown logic (if needed) goes here

app = FastAPI(lifespan=lifespan)

# --- 3. Enhanced CORS Configuration ---
# In Docker, you might access the frontend via port 3000, 5173, or port 80 (localhost).
# Adding all common variations prevents CORS errors.
origins = [
    "http://localhost",           # Standard HTTP port 80
    "http://localhost:5173",      # Vite Local Dev
    "http://localhost:3000",      # Common React/Docker Port
    "http://127.0.0.1:5173",      # Local IP variation
    "http://127.0.0.1:3000",      # Local IP variation
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 4. Routers ---
app.include_router(user_router.router)
app.include_router(article_router.router)
app.include_router(like_router.router)

# --- 5. Static Files Mount ---
# We use the absolute IMAGES_DIR calculated above.
app.mount("/app/images", StaticFiles(directory=IMAGES_DIR), name="images")

@app.get("/")
async def root():
    return {"message": "Welcome to Publishly API", "status": "running"}
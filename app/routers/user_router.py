from typing import List
from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user_schema import CreateUserRequest, UserResponse
from app.services.user_service import UserService, get_user_service
from app.utils.jwt_utils import Token

from app.models.user import User
from app.utils.jwt_utils import get_current_user, create_access_token, Token

router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@router.post("/signup", response_model=UserResponse)
def signup(request: CreateUserRequest, user_service: UserService = Depends(get_user_service)):
    return user_service.create_user(request)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), user_service: UserService = Depends(get_user_service)):
    return user_service.login(form_data)

@router.post("/upload-profile-image", response_model=UserResponse)
def upload_profile_image(image: UploadFile = File(...) ,user : User = Depends(get_current_user), user_service: UserService = Depends(get_user_service)):
    return user_service.update_user_profile_image(user,image)

@router.post("/upload-cover-image", response_model=UserResponse)
def upload_cover_image(image: UploadFile = File(...) ,user : User = Depends(get_current_user), user_service: UserService = Depends(get_user_service)):
    return user_service.update_user_cover_image(user,image)

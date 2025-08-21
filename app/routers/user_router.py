from typing import List
from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user_schema import CreateUserRequest, UserResponse, UserPageResponse
from app.services.user_service import UserService, get_user_service

from app.models.user import User
from app.utils.jwt_utils import get_current_user

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

@router.post("/update-profile-image", response_model=UserResponse)
def upload_profile_image(image: UploadFile = File(...) ,user : User = Depends(get_current_user), user_service: UserService = Depends(get_user_service)):
    return user_service.update_user_profile_image(user,image)

@router.post("/update-cover-image", response_model=UserResponse)
def upload_cover_image(image: UploadFile = File(...) ,user : User = Depends(get_current_user), user_service: UserService = Depends(get_user_service)):
    return user_service.update_user_cover_image(user,image)

@router.get("/id/{id}", response_model=UserPageResponse)
def get_user_by_id(id:int , user_service: UserService = Depends(get_user_service)):
    return user_service.get_user_by_id(id)

@router.get("/username/{username}", response_model=UserPageResponse)
def get_user_user_name(username:str , user_service: UserService = Depends(get_user_service)):
    return user_service.get_user_by_user_name(username)

@router.get("", response_model=UserResponse)
def get_current_user(user : User = Depends(get_current_user)):
    return user


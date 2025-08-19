from typing import List
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user_schema import CreateUserRequest, UserResponse
from app.services.user_service import UserService, get_user_service
from app.utils.jwt_utils import Token

router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@router.post("/signup", response_model=UserResponse)
def signup(request: CreateUserRequest, user_service: UserService = Depends(get_user_service)):
    return user_service.create_user(request)

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), user_service: UserService = Depends(get_user_service)):
    return user_service.login(form_data)

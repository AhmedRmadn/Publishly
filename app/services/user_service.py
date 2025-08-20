import shutil
import string
import random

from fastapi import Depends, HTTPException, UploadFile
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from app.repositories.user_repository import UserRepository, get_user_repository
from app.schemas.user_schema import CreateUserRequest
from app.models.user import User
from app.utils.hash_utils import Hash
from app.utils.jwt_utils import get_current_user, create_access_token, Token
from typing import Optional

class UserService:
    def __init__(self, user_repo : UserRepository):
        self.__user_repo = user_repo
        self.__hash = Hash()

    def create_user(self,create_user_request: CreateUserRequest):
        user= User(
            email=create_user_request.email,
            username=create_user_request.username,
            first_name=create_user_request.first_name,
            last_name=create_user_request.last_name,
            role=create_user_request.role,
            password=Hash.bcrypt_hash(create_user_request.password)
        )
        user = self.__user_repo.save_user(user)
        return user

    def authenticate_user(self,username: str, password: str):
        user = self.__user_repo.get_user_by_username(username)
        if not user:
            return False
        if not self.__hash.verify(password, user.password):
            return False
        return user

    def login(self,form_data: OAuth2PasswordRequestForm) :
        user = self.authenticate_user(form_data.username, form_data.password)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Could not validate user.')
        token = create_access_token(user = user)
        return token

    def update_user_profile_image(self , user : User, image : UploadFile):
        letters = string.ascii_letters
        random_str = ''.join(random.choice(letters) for i in range(10))
        new = f"{random_str}."
        print(new,"profile")
        filename = new + image.filename.split('.', 1)[-1]
        path = f"app/images/profile/{filename}"
        with open(path, "w+b") as buffer:
            shutil.copyfileobj(image.file, buffer)
        user = self.__user_repo.set_user_profile_image(user, path)
        return user

    def update_user_cover_image(self , user : User, image : UploadFile):
        letters = string.ascii_letters
        random_str = ''.join(random.choice(letters) for i in range(10))
        new = f"{random_str}."
        print(new,"profile")
        filename = new + image.filename.split('.', 1)[-1]
        path = f"app/images/cover/{filename}"
        with open(path, "w+b") as buffer:
            shutil.copyfileobj(image.file, buffer)
        user = self.__user_repo.set_user_cover_image(user, path)
        return user
    
    def get_user_by_id(self, id : int) -> Optional[User]:
        return self.__user_repo.get_user_by_id(id)





def get_user_service(user_repo : UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(user_repo)


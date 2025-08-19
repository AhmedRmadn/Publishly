from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from app.repositories.user_repository import UserRepository, get_user_repository
from app.schemas.user_schema import CreateUserRequest
from app.models.user import User
from app.utils.hash_utils import Hash
from app.utils.jwt_utils import JwtUtils, Token


class UserService:
    def __init__(self, user_repo : UserRepository):
        self.__user_repo = user_repo
        self.__jwt_util = JwtUtils()
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
        self.__user_repo.save_user(user)
        return user

    def authenticate_user(self,username: str, password: str):
        user = self.__user_repo.get_user_by_username(username)
        if not user:
            return False
        if not self.__hash.verify(password, user.password):
            return False
        return user

    def login(self,form_data: OAuth2PasswordRequestForm) -> Token:
        user = self.authenticate_user(form_data.username, form_data.password)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Could not validate user.')
        token = self.__jwt_util.create_access_token(user)

        return token


def get_user_service(user_repo : UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(user_repo)


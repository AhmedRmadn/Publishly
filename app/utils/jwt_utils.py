from datetime import timedelta, datetime, timezone
from starlette import status
from fastapi import HTTPException
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from app.models.user import User
from jose import jwt, JWTError

from app.repositories.user_repository import UserRepository, get_user_repository


class Token(BaseModel):
    access_token: str
    token_type: str

class JwtUtils:
    SECRET_KEY = '157b2c37c391bed93fe80344fe73b806947a65e36206e05a1a23c2fa12702fe3'
    ALGORITHM = 'HS256'
    oauth2_bearer = OAuth2PasswordBearer(tokenUrl='user/login')
    expires_delta = timedelta(minutes=15)


    def create_access_token(self,user : User) -> Token:
        expires = datetime.now(timezone.utc) + self.expires_delta
        encode = {"sub": str(user.id), 'exp': expires}
        token_str = jwt.encode(encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
        token = Token(
            access_token=token_str,
            token_type='Bearer',
        )
        return token

    def get_current_user(self,token: str =  Depends(oauth2_bearer) , repo : UserRepository = Depends(get_user_repository)) -> User:
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            user_id: int = int(payload.get('sub'))
            if user_id is None:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                    detail='Could not validate user.')
            return repo.get_user_by_id(user_id)
        except JWTError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Could not validate user.')

def get_jwt_util():
    return JwtUtils()


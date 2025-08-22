from datetime import timedelta, datetime, timezone
from starlette import status
from fastapi import HTTPException
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from app.models.user import User
from jose import jwt, JWTError
from app.config import SECRET_KEY
from app.config import ALGORITHM
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.repositories.user_repository import UserRepository, get_user_repository


class Token(BaseModel):
    access_token: str
    token_type: str

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='user/login')
expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)


def create_access_token(user : User) -> Token:
    expires = datetime.now(timezone.utc) + expires_delta
    encode = {"sub": str(user.id), 'exp': expires}
    token_str = jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
    token = Token(
        access_token=token_str,
        token_type='Bearer',
    )
    return token

def get_current_user(token: str =  Depends(oauth2_bearer) , repo : UserRepository = Depends(get_user_repository)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = int(payload.get('sub'))
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Could not validate user.')
        return repo.get_user_by_id(user_id)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Could not validate user.')




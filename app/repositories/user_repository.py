from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User

class UserRepository:

    def __init__(self, db: Session):
        self.__db = db

    def get_user_by_id(self, user_id: int) -> User:
        user = self.__db.query(User).filter(User.id == user_id).first()
        return user

    def save_user(self, user: User):
        self.__db.add(user)
        self.__db.commit()
        self.__db.refresh(user)

    def get_user_by_username(self, username: str) -> User:
        user =  self.__db.query(User).filter(User.username == username).first()
        return user

    def set_user_profile_image(self, user: User , profile_image_url: str):
        user.profile_image_url = profile_image_url
        self.__db.commit()
        self.__db.refresh(user)

    def set_user_cover_image(self, user: User , cover_image_url: str):
        user.cover_image_url = cover_image_url
        self.__db.commit()
        self.__db.refresh(user)




def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

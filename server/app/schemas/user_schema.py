from typing import Optional

from pydantic import BaseModel
from datetime import datetime

class CreateUserRequest(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    password: str
    role: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    role: str
    profile_image_url: Optional[str] = None
    cover_image_url: Optional[str] = None

class ArticleUserSchema(BaseModel):
    id : int
    title : str
    poster_image_url : Optional[str] = None
    author_id : int
    count_likes : int
    # raw datetime (from DB)
    created_at: datetime

    # pretty formatted string
    created_at_readable: Optional[str] = None

    class Config:
        from_attributes = True

    @classmethod
    def from_model(cls, obj):
        instance = cls.model_validate(obj, from_attributes=True)
        instance.created_at_readable = obj.created_at.strftime("%B %d, %Y %H:%M")
        return instance


class UserPageResponse(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    role: str
    profile_image_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    articles: list[ArticleUserSchema] = []
    class Config:
        from_attributes = True

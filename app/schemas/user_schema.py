from typing import Optional

from pydantic import BaseModel


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
    class Config:
        from_attributes = True

class UserPageResponse(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    role: str
    profile_image_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    articles: list[ArticleUserSchema] = None
    class Config:
        from_attributes = True

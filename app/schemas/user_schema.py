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
    username: str
    email: str
    first_name: str
    last_name: str
    role: str
    profile_image_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    liked_posts: list
    posts: list


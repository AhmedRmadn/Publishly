from pydantic import BaseModel
from typing import Optional

class UserArticleModel(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    profile_image_url: Optional[str] = None

class ArticleResponse(BaseModel):
    id : int
    title : str
    content : str
    poster_image_url : Optional[str] = None
    author_id : int
    count_likes : int
    author : UserArticleModel
    class Config:
        from_attributes = True

class ArticlePreviewResponse(BaseModel):
    id : int
    title : str
    poster_image_url : Optional[str] = None
    author_id : int
    count_likes : int
    author : UserArticleModel
    class Config:
        from_attributes = True








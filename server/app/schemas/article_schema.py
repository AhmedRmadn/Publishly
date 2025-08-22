from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from pydantic import computed_field


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
    # raw datetime (from DB)
    created_at: datetime

    @computed_field
    @property
    def created_at_readable(self) -> str:
        return self.created_at.strftime("%B %d, %Y %H:%M")

    class Config:
        from_attributes = True

    # @classmethod
    # def from_model(cls, obj):
    #     instance = cls.model_validate(obj, from_attributes=True)
    #     instance.created_at_readable = obj.created_at.strftime("%B %d, %Y %H:%M")
    #     return instance


class ArticlePreviewResponse(BaseModel):
    id: int
    title: str
    poster_image_url: Optional[str] = None
    author_id: int
    count_likes: int
    author: UserArticleModel

    # raw datetime (from DB)
    created_at: datetime

    # pretty formatted string
    @computed_field
    @property
    def created_at_readable(self) -> str:
        return self.created_at.strftime("%B %d, %Y %H:%M")

    class Config:
        from_attributes = True

    # @classmethod
    # def from_model(cls, obj):
    #     instance = cls.model_validate(obj, from_attributes=True)
    #     instance.created_at_readable = obj.created_at.strftime("%B %d, %Y %H:%M")
    #     return instance





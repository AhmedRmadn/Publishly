

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.user_likes_post import user_likes_post


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    username = Column(String , unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String, default='user')
    posts = relationship("Post", back_populates="author")
    profile_image_url = Column(String)
    cover_image_url = Column(String)
    liked_posts = relationship(
        "Post",
        secondary=user_likes_post,
        back_populates="liked_by"
    )




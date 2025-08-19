

from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.user_likes_post import user_likes_post


class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer,primary_key=True,autoincrement=True)
    title = Column(String,nullable=False)
    content = Column(String, nullable=False)
    poster_image_url = Column(String)
    author_id = Column(Integer, ForeignKey("users.id"))
    author = relationship("User",back_populates="posts")
    liked_by = relationship(
        "User",
        secondary=user_likes_post,
        back_populates="liked_posts"
    )


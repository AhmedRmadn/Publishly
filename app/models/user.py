

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.user_likes_article import user_likes_article


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    username = Column(String , unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String, default='user')
    articles = relationship("Article", back_populates="author")
    profile_image_url = Column(String)
    cover_image_url = Column(String)
    liked_articles = relationship(
        "Article",
        secondary=user_likes_article,
        back_populates="liked_by"
    )




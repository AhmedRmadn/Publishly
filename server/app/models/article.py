
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, func
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.user_likes_article import user_likes_article


class Article(Base):
    __tablename__ = "articles"
    id = Column(Integer,primary_key=True,autoincrement=True)
    title = Column(String,nullable=False)
    content = Column(String, nullable=False)
    poster_image_url = Column(String)
    author_id = Column(Integer, ForeignKey("users.id"))
    count_likes = Column(Integer, default= 0)
    author = relationship("User",back_populates="articles")
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        index=True   # ✅ adds index
    )
    liked_by = relationship(
        "User",
        secondary=user_likes_article,
        back_populates="liked_articles"
    )


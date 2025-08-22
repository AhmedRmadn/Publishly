from sqlalchemy import Table, Column, Integer, ForeignKey
from app.database import Base
user_likes_article = Table(
    "user_likes_article",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("article_id", Integer, ForeignKey("articles.id"), primary_key=True),
)
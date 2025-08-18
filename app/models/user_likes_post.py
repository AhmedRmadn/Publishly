from sqlalchemy import Table, Column, Integer, ForeignKey
from app.database import Base
user_likes_post = Table(
    "user_likes_posts",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("post_id", Integer, ForeignKey("posts.id"), primary_key=True),
)
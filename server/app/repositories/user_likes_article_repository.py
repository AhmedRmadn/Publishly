from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.models.user_likes_article import user_likes_article
from sqlalchemy import insert, delete
from sqlalchemy.exc import IntegrityError
class UserLikesArticleRepository:
    def __init__(self , db: Session):
        self.__db = db
    
    def does_user_like_article(self, user_id: int, article_id: int) -> bool:
        result = self.__db.query(user_likes_article).filter(
            user_likes_article.c.user_id == user_id,
            user_likes_article.c.article_id == article_id
        ).first()
        return result is not None



    def like_article(self, user_id: int, article_id: int) -> bool:
        stmt = insert(user_likes_article).values(
            user_id=user_id,
            article_id=article_id
        )
        try:
            self.__db.execute(stmt)
            self.__db.commit()
            return True
        except IntegrityError:
            self.__db.rollback()
            return False
    
    from sqlalchemy import delete

    def unlike_article(self , user_id: int, article_id: int) -> bool:
        stmt = delete(user_likes_article).where(
            user_likes_article.c.user_id == user_id,
            user_likes_article.c.article_id == article_id
        )
        result = self.__db.execute(stmt)
        self.__db.commit()
        return result.rowcount > 0  # True if a row was deleted

        
def get_user_likes_article_repository(db: Session = Depends(get_db)) -> UserLikesArticleRepository:
    return UserLikesArticleRepository(db)



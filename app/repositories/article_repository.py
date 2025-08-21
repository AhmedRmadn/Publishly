from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.article import Article
from typing import Optional

class ArticleRepository:
    def __init__(self,db:Session):
        self.__db = db
        
    def save_article(self, article : Article) -> Article:
        self.__db.add(article)
        self.__db.commit()
        self.__db.refresh(article)
        return article
    
    def get_all(self) ->list[Article]:
        return self.__db.query(Article).all()
    
    def get_article_by_id(self,id : int) -> Optional[Article]:
        return self.__db.query(Article).filter(Article.id == id).first()
    
    def change_like_count(self, article_id: int , delta:int) -> int:
        article = self.__db.query(Article).filter(Article.id == article_id).first()
        if not article:
            return False  # Article not found

        article.count_likes += delta
        self.__db.commit()
        self.__db.refresh(article)
        return article.count_likes
        


def get_article_repository(db : Session = Depends(get_db)) -> ArticleRepository:
    return ArticleRepository(db)

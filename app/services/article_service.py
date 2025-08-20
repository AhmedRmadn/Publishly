from app.repositories.article_repository import ArticleRepository, get_article_repository
from fastapi import UploadFile, Depends
from app.models.article import Article
from app.models.user import User
from typing import Optional
import shutil
import string
import random

class ArticleService:
    def __init__(self, article_repository: ArticleRepository):
        self.__article_repository = article_repository

    def uploadImage(self, file: UploadFile)-> str:
        letters = string.ascii_letters
        random_str = ''.join(random.choice(letters) for i in range(10))
        new = f"{random_str}."
        filename = new + file.filename.split('.', 1)[-1]
        path = f"app/images/article/{filename}"
        with open(path, "w+b") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return f"http://localhost:8000/{path}"
    
    def publish_article(self, user : User, title: str, content: str , poster: UploadFile) -> Article:
        poster_image_url = self.uploadImage(poster)
        article = Article(
            title = title,
            content =content,
            poster_image_url = poster_image_url,
            author_id = user.id
        )
        article = self.__article_repository.save_article(article)
        return article
    
    def get_all_articles(self) -> list[Article]:
        return self.__article_repository.get_all()

    def get_article_by_id(self, id : int) ->Optional[Article] :
        return self.__article_repository.get_article_by_id(id)

def get_article_service(article_repository: ArticleRepository = Depends(get_article_repository)) -> ArticleService :
    return ArticleService(article_repository)

    
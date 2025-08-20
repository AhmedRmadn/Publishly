
from fastapi import APIRouter, Depends, Form, UploadFile, File
from app.models.user import User
from app.schemas.article_schema import ArticleResponse, ArticlePreviewResponse
from app.services.article_service import ArticleService, get_article_service
from app.utils.jwt_utils import get_current_user
from typing import List
from typing import Optional

router = APIRouter(
    prefix="/article",
    tags=["article"]
)
@router.post("/create-article" , response_model=ArticleResponse)
def upload(user: User = Depends(get_current_user),
           article_service : ArticleService = Depends(get_article_service),
           title: str = Form(...),
    content: str = Form(...),
    poster: UploadFile = File(None)):
    return article_service.publish_article(user, title, content , poster)


@router.post("/upload-image")
def upload(_: User = Depends(get_current_user),
           article_service : ArticleService = Depends(get_article_service),file: UploadFile = File(...)):
    return {"link": article_service.uploadImage(file)}

@router.get("", response_model=List[ArticlePreviewResponse])
def get_all_articles(article_service : ArticleService = Depends(get_article_service)):
    return article_service.get_all_articles()

@router.get("/{id}" , response_model= ArticleResponse)
def get_article_by_id(id : int , article_service : ArticleService = Depends(get_article_service)):
    return article_service.get_article_by_id(id)






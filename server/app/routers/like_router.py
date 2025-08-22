from fastapi import APIRouter, Depends
from app.models.user import User
from app.utils.jwt_utils import get_current_user
from app.services.user_likes_article_service import UserLikesArticleService, get_user_likes_article_service
router = APIRouter(
    prefix="/like",
    tags=["user", "article"]
)

@router.get("/{article_id}")
def does_user_likes_article(article_id : int , user: User = Depends(get_current_user),userLikesArticleService : UserLikesArticleService = Depends(get_user_likes_article_service) ):
    return {"user_likes_article" : userLikesArticleService.does_user_like_article(user,article_id)}

@router.put("/{article_id}")
def update_like_article(article_id : int , user: User = Depends(get_current_user),userLikesArticleService : UserLikesArticleService = Depends(get_user_likes_article_service) ):
    return {"count_likes" : userLikesArticleService.update_likes(user,article_id)}
from app.repositories.user_likes_article_repository import UserLikesArticleRepository, get_user_likes_article_repository
from app.repositories.article_repository import ArticleRepository, get_article_repository
from app.models.user import User
from fastapi import Depends
class UserLikesArticleService:
    def __init__(self, userLikesArticleRepository : UserLikesArticleRepository, article_repository: ArticleRepository):
        self.__userLikesArticleRepository = userLikesArticleRepository
        self.__article_repository = article_repository
    
    def does_user_like_article(self, user: User, article_id: int) -> bool:
        user_id = user.id
        return self.__userLikesArticleRepository.does_user_like_article(user_id, article_id)
    
    def update_likes(self , user : User, article_id: int) -> int:
        user_id = user.id
        if(self.does_user_like_article(user,article_id)):
            print("hiiiiii")
            valid = self.__userLikesArticleRepository.unlike_article(user_id, article_id)
            return self.__article_repository.change_like_count(article_id,-1)
        else:
            valid = self.__userLikesArticleRepository.like_article(user_id,article_id)
            return self.__article_repository.change_like_count(article_id,1)
        
def get_user_likes_article_service(userLikesArticleRepository : UserLikesArticleRepository = Depends(get_user_likes_article_repository), article_repository: ArticleRepository = Depends(get_article_repository)) -> UserLikesArticleService:
    return UserLikesArticleService(userLikesArticleRepository, article_repository)

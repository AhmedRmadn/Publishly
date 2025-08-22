import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Heart } from "lucide-react";
import { UseLikeArticle } from "../hooks/useLikeArticle";
export default function Article() {
  const articleData = useLoaderData();

  // Fake created_at (replace with real backend field)

  // State for like toggle
  const [liked, setLiked] = useState(articleData.user_likes_article);
  const [likesCount, setLikesCount] = useState(articleData.count_likes);
  const { likePost, isLike } = UseLikeArticle({
    onSuccess: (currentCount) => {
      setLiked((prev) => !prev);
      setLikesCount(currentCount["count_likes"]);
    },
  });

  async function handleLikeClick() {
    await likePost(articleData.id);
  }

  return (
    <div className="max-w-4xl text-black mx-auto  rounded-xl p-6 mt-6">
      {/* Author Info */}
      <Link
        to={`/user/${articleData.author.username}`}
        className="flex items-center space-x-3 mb-4"
      >
        {articleData.author.profile_image_url ? (
          <img
            src={articleData.author.profile_image_url}
            alt={articleData.author.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
            {articleData.author.username.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-gray-700 font-medium">
          <p className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors duration-200 truncate">
            {articleData.author.first_name} {articleData.author.last_name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            @{articleData.author.username}
          </p>
        </span>
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {articleData.title}
      </h1>

      {/* Created At + Likes */}
      <div className="flex items-center space-x-4 text-gray-600 text-sm mb-15">
        <span>{articleData.created_at_readable}</span>
        <button
          onClick={handleLikeClick}
          className="flex items-center space-x-1 cursor-pointer hover:text-red-500 transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              liked ? "fill-red-500 text-red-500" : ""
            }`}
          />
          <span>{likesCount}</span>
        </button>
      </div>

      {/* Content */}
      <div className="prose max-w-none">
        <div
          className="fr-view"
          dangerouslySetInnerHTML={{ __html: articleData.content }}
        />
      </div>
    </div>
  );
}

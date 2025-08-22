import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, User, Calendar } from "lucide-react";

export default function ArticleCard({ article, type = "avatar" }) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-black/10"
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <img
          src={
            imageError || !article.poster_image_url
              ? "/no_poster.png"
              : article.poster_image_url
          }
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={() => setImageError(true)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Article Info */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-extrabold text-black text-2xl leading-snug line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
          {article.title}
        </h3>

        {/* Created At + Likes (before author) */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{article.created_at_readable || "Aug 21, 2025"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={14} className="text-red-500" />
            <span>{article.count_likes}</span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3 pt-1">
          {type === "avatar" && (
            <div className="relative">
              <img
                src={article.author.profile_image_url || "/no_profile.png"}
                alt={`${article.author.first_name} ${article.author.last_name}`}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-black transition-colors duration-200"
                onError={(e) => {
                  e.target.src = "/no_profile.png";
                }}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center">
                <User size={10} className="text-white" />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors duration-200 truncate">
              {article.author.first_name} {article.author.last_name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              @{article.author.username}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

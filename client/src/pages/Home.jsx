import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useAllArticles } from "../hooks/useAllArticles";
import { RefreshCw, TrendingUp } from "lucide-react";

export default function Home() {
  const { articlesLoading, isError, articles, error } = useAllArticles();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  // Loading state
  if (articlesLoading) {
    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <div className="w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center shadow-2xl">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black">
            Welcome to Publishly
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing articles from creators around the world
          </p>
        </div>

        {/* Loading list */}
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse flex gap-4">
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-40 h-28 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <ErrorMessage
          error={error}
          onRetry={handleRefresh}
          title="Failed to load articles"
          variant="error"
        />
      </div>
    );
  }

  // Empty state
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <TrendingUp className="w-12 h-12 text-gray-600" />
        </div>
        <h2 className="text-2xl font-bold text-black">No articles found</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          It looks like there are no articles available right now. Check back
          later or be the first to upload!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black">Trending articles</h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the latest and most popular content from our community
        </p>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Refresh Button */}
      <div className="text-center pt-8">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <RefreshCw
            className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh articles"}
        </button>
      </div>
    </div>
  );
}

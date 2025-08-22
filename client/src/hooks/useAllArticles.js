import { useQuery } from "@tanstack/react-query";
import { fetchAllArticles } from "../services/ArticleService";

export function useAllArticles() {
  const {
    isPending: articlesLoading,
    data: articles,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["articlesHome"],
    queryFn: fetchAllArticles,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    articlesLoading,
    error,
    articles,
    isError,
    refetch,
  };
}

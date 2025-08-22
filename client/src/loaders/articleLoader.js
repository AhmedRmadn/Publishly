import { fetchArticle } from "../services/ArticleService";
export default async function videoLoader({ params }) {
  return await fetchArticle(params.articleId);
}

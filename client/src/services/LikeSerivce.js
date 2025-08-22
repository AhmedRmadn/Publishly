const base = "http://localhost:8000/like/";
const tokenKeyStorage = "access_token";

export async function userLikesArticle(articleId) {
  const token = localStorage.getItem(tokenKeyStorage);
  if (!token) {
    throw new Error(`login first`);
  }
  const res = await fetch(`${base}${articleId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`failed: ${res.status} ${errorText}`);
  }
  const data = await res.json();
  return data;
}

const base = "http://localhost:8000/article/";
const tokenKeyStorage = "access_token";
export async function fetchAllArticles() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const res = await fetch(`${base}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error. Please check your connection.");
    }

    throw new Error(
      error.message || "Failed to fetch articles. Please try again later."
    );
  }
}

async function does_user_like_article(articleId) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return false;
  }
  const res = await fetch(`http://localhost:8000/like/${articleId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return false;
  }
  const data = await res.json();
  return data["user_likes_article"];
}

export async function fetchArticle(id) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(`${base}${id}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch video. Status: ${res.status}`
      );
    }

    const data = await res.json();
    data["user_likes_article"] = await does_user_like_article(data.id);
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error. Please check your connection.");
    }

    throw new Error(
      error.message || "Failed to fetch article. Please try again later."
    );
  }
}

export async function upload(articleData) {
  const token = localStorage.getItem(tokenKeyStorage);
  const formData = new FormData();
  formData.append("title", articleData.title);
  if (articleData.poster) {
    formData.append("poster", articleData.poster);
  }
  formData.append("content", articleData.model);

  const response = await fetch(`${base}create-article`, {
    // removed trailing space
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = "upload failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      throw new Error(errorMessage);
    }
    throw new Error(errorMessage); // throw error to propagate
  }

  const data = await response.json();
  return data;
}

export async function uploadImage(fileData) {
  const token = localStorage.getItem(tokenKeyStorage);
  const formData = new FormData();
  formData.append("file", fileData.file);

  const response = await fetch(`${base}upload-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Failed to parse server response");
  }

  if (!response.ok) {
    const errorMessage = data?.message || "Upload failed";
    throw new Error(errorMessage);
  }
  console.log(data);
  return data; // successful response
}

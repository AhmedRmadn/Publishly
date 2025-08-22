import { fetchUserProfileByUserName } from "../services/ProfileService";
export default async function profileLoader({ params }) {
  const { userName } = params;

  try {
    const res = await fetchUserProfileByUserName(userName);

    const user = {
      id: res.id,
      username: res.username,
      email: res.email,
      first_name: res.first_name,
      last_name: res.last_name,
      role: res.role,
      profile_image_url: res.profile_image_url,
      cover_image_url: res.cover_image_url,
    };

    const articles = (res.articles || []).map((article) => ({
      ...article,
      author: user, // attach user as author
    }));

    return { user, articles };
  } catch (error) {
    console.error("Failed to load user data", error);
    throw error;
  }
}

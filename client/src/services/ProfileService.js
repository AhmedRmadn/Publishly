const base = "http://localhost:8000/user/";
const tokenKeyStorage = "access_token";

export async function fetchUserProfile() {
  const token = localStorage.getItem(tokenKeyStorage);
  const res = await fetch(`${base}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized or failed to fetch profile");
  }

  const json = await res.json();
  return json; // access data after resolving json
}

export async function fetchUserProfileByUserName(userName) {
  const res = await fetch(`${base}username/${userName}`);

  if (!res.ok) {
    throw new Error("could not load user page try again later");
  }

  const json = await res.json();

  return json; // access data after resolving json
}

export async function updateUserProfile(profileImage) {
  const token = localStorage.getItem(tokenKeyStorage);
  const formData = new FormData();
  formData.append("image", profileImage);

  const res = await fetch(`${base}update-profile-image`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Update profile image failed: ${res.status} ${errorText}`);
  }
  return res.json();
}

export async function updateUserCover(coverImage) {
  const token = localStorage.getItem(tokenKeyStorage);
  const formData = new FormData();
  formData.append("image", coverImage);

  const res = await fetch(`${base}update-cover-image`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Update cover image failed: ${res.status} ${errorText}`);
  }
  return res.json();
}

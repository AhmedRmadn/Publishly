const base = "http://localhost:8000/user/";

export async function login(authData) {
  const formData = new URLSearchParams();
  formData.append("username", authData.username);
  formData.append("password", authData.password);

  const auth = await fetch(`${base}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!auth.ok) {
    // Try to parse error message from response body
    let errorMessage = "Login failed";
    try {
      const errorData = await auth.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch {
      // ignore parse errors
    }
    throw new Error(errorMessage);
  }

  return auth.json();
}

// services/AuthService.js
export async function register(authData) {
  const response = await fetch(`${base}signup `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: authData.username,
      email: authData.email,
      first_name: authData.firstName, // map camelCase -> snake_case
      last_name: authData.lastName,
      password: authData.password,
      role: "user", // hardcode role for signup (or add field if user can pick)
    }),
  });

  if (!response.ok) {
    let errorMessage = "Signup failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      /* ignore */
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function signout() {
  const auth = await fetch("http://localhost:7070/USER-AUTH/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // <--- REQUIRED
  });

  if (!auth.ok) {
    const errorData = await auth.json();
    throw new Error(errorData.message || "signout failed");
  }
}

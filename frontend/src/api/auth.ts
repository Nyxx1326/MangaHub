const BASE_URL = "http://localhost:8080";

export const loginApi = async (username: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("login failed");
  }

  return res.json(); // { token: "..." }
};
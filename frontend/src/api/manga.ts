const BASE_URL = "http://localhost:8080";

export const getManga = async () => {
  const res = await fetch(`${BASE_URL}/manga`);
  return res.json();
};
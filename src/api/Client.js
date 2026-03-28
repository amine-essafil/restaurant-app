import axios from "axios";

// Single axios instance — never import axios directly anywhere else
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  withCredentials: true, // Required for Laravel Sanctum cookie-based auth
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) console.warn("Unauthorized — handled by AuthContext");
    if (status === 403) console.warn("Forbidden — insufficient permissions");
    if (status >= 500) console.error("Server error:", error.response?.data);

    return Promise.reject(error);
  }
);

export default client;
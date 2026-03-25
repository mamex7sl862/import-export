// lib/axios.ts
import axios from "axios";
const SERVER_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_SERVER_BASE_URL;

// Authenticated API — for admin panel requests (attaches token automatically)
export const api = axios.create({
  baseURL: `${SERVER_BASE_URL}`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Public API — for client-facing pages (never sends auth token, always gets published-only data)
export const publicApi = axios.create({
  baseURL: `${SERVER_BASE_URL}`,
  headers: { "Content-Type": "application/json" },
});

publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

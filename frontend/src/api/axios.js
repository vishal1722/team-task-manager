import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://team-task-manager-one-theta.vercel.app";

const API = axios.create({
  baseURL: `${baseURL}/api`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
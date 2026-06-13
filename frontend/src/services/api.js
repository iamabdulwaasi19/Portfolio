import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export const projectsAPI = {
  getAll: async () => {
    const response = await api.get("/projects");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  create: async (project) => {
    const response = await api.post("/projects", project);
    return response.data;
  },
  update: async (id, project) => {
    const response = await api.put(`/projects/${id}`, project);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/projects/${id}`);
  },
};

export default api;

import axios from "axios";
//helps cerntralize API calls
const API_URL = "http://localhost:5001";

export const register = async (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const login = async (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getTasks = async () => {
  return axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

export const createTask = async (title: string, description: string) => {
  return axios.post(`${API_URL}/tasks`, { title, description }, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};
export const updateTask = async (id: number, updatedTask: object) =>
  axios.put(`${API_URL}/tasks/${id}`, updatedTask, {
    headers: { Authorization: localStorage.getItem("token") },
  });

export const deleteTask = async (id: number) =>
  axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
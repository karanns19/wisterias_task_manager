import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/tasks';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  getTasks: async (params = {}) => {
    const response = await apiClient.get('', { params });
    return response.data.data;
  },

  getTask: async (id) => {
    const response = await apiClient.get(`/${id}`);
    return response.data.data;
  },

  createTask: async (taskData) => {
    const response = await apiClient.post('', taskData);
    return response.data.data;
  },

  updateTask: async (id, taskData) => {
    const response = await apiClient.put(`/${id}`, taskData);
    return response.data.data;
  },

  deleteTask: async (id) => {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  },
};

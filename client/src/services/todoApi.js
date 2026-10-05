import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getTodos = async () => {
  const response = await api.get('/todos');
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await api.post('/todos', todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await api.put(`/todos/${id}`, todoData);
  return response.data;
};

export const toggleDoneStatus = async (id) => {
  const response = await api.patch(`/todos/${id}/done`);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
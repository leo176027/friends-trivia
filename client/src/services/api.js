import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Agregar token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Autenticación
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Preguntas
export const questionService = {
  getDailyQuestion: (language = 'es') => api.get(`/questions/daily?lang=${language}`),
  getAllQuestions: () => api.get('/questions'),
  createQuestion: (data) => api.post('/questions', data),
};

// Puntuación
export const scoreService = {
  answerQuestion: (data) => api.post('/scores/answer', data),
  getRanking: () => api.get('/scores/ranking'),
  getUserRank: () => api.get('/scores/user-rank'),
  getUserStats: () => api.get('/scores/stats'),
};

export default api;

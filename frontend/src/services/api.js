import axios from 'axios';

// Use backend URL from environment variable, or default to deployed backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://aura-backend-tau.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const cyclesAPI = {
  addCycle: (data) => api.post('/cycles', data),
  getCycles: () => api.get('/cycles'),
  getStats: () => api.get('/cycles/stats'),
  predictNext: () => api.get('/cycles/predict-next'),
};

export const symptomsAPI = {
  logSymptom: (data) => api.post('/symptoms', data),
  getSymptoms: (params) => api.get('/symptoms', { params }),
  getAnalysis: () => api.get('/symptoms/analysis'),
};

export const predictionsAPI = {
  assessPCODRisk: (data) => api.post('/predictions/pcod-risk', data),
  autoAssess: () => api.get('/predictions/pcod-risk/auto'),
};

export default api;

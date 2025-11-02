import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem('auth_token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
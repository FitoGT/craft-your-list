/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { api } from '../api/client';

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await api.post('/auth/login', payload);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      return data;
    },
  });


export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
};

export const getCurrentUser = (): { name: string, id: string } | null => {
  const raw = localStorage.getItem('auth_user');
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
};
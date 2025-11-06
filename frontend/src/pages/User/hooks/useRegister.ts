import { useMutation } from '@tanstack/react-query';
import { api } from '../../../api/client';
import type { RegisterData, RegisterResponse } from '../interfaces';

export const useRegister = () =>
  useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: async (data) => {
      const res = await api.post<RegisterResponse>('/auth/register', data);
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('auth_user', JSON.stringify(res.data.user));
      return res.data;
    },
  });

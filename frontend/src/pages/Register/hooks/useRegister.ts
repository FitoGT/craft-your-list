import { useMutation } from '@tanstack/react-query';
import { api } from '../../../api/client';

export type RegisterData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  nationality: string;
  tcg: 'pokemon' | 'yugioh';
  playerId?: string;
  konamiId?: string;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await api.post('/auth/register', data);
      return res.data;
    },
  });
};

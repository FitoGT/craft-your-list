import { useMutation } from '@tanstack/react-query';
import { api } from '../../../api/client';

export type UpdateUserPayload = {
  id: string;
  data: {
    name?: string;
    lastname?: string;
    email?: string;
    birthdate?: string;
    nationality?: string;
    pokemonInfo?: { playerId: string } | null;
    yugiohInfo?: { konamiId: string } | null;
  };
};

export const useUpdateUser = () =>
  useMutation({
    mutationFn: async ({ id, data }: UpdateUserPayload) => {
      const res = await api.put(`/users/${id}`, data);
      return res.data;
    },
  });

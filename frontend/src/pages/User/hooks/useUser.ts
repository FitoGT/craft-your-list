import { useQuery } from '@tanstack/react-query';
import { api } from '../../../api/client';
import type { UserResponse } from '../interfaces';

export const useUser = (id?: string) =>
  useQuery({
    queryKey: ['user', id],
    enabled: !!id,
    queryFn: async (): Promise<UserResponse> => {
      const { data } = await api.get(`/users/${id}`);
      return data;
    },
  });
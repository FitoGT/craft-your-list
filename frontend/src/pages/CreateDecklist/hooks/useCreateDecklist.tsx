/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../api/client';

export const useGenerateDecklist = () =>
  useMutation({
    mutationFn: async (payload: { rawList: string }) => {
      const { data } = await api.post('/pdf/decklist', payload, {
        responseType: 'blob',
      });
      return data as Blob;
    },
  });

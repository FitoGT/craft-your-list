import { useMutation } from '@tanstack/react-query';
import { api } from '../../../api/client';
import type { DecklistPayload } from '../types';

export const useGenerateDecklist = () =>
  useMutation<Blob, Error, DecklistPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post('/pdf/decklist', payload, { responseType: 'blob' });
      return data;
    },
  });
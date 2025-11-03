import { z } from 'zod';

export const baseFields = {
  name: z.string().min(1, 'Requerido'),
  lastname: z.string().min(1, 'Requerido'),
  email: z.string().email('Email inválido'),
  birthdate: z.string().min(1, 'Requerido'),
  nationality: z.string().min(1, 'Requerido'),
  tcg: z.enum(['pokemon', 'yugioh']),
  playerId: z.string().optional(),
  konamiId: z.string().optional(),
};

export const createSchema = z
  .object({
    ...baseFields,
    password: z.string().min(8, 'Mínimo 8 caracteres'),
  })
  .superRefine((val, ctx) => {
    if (val.tcg === 'pokemon' && !val.playerId)
      ctx.addIssue({ path: ['playerId'], code: 'custom', message: 'Requerido para Pokémon' });
    if (val.tcg === 'yugioh' && !val.konamiId)
      ctx.addIssue({ path: ['konamiId'], code: 'custom', message: 'Requerido para Yu-Gi-Oh!' });
  });

export const editSchema = z
  .object({
    ...baseFields,
    // en edición, no pedimos password
    password: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.tcg === 'pokemon' && !val.playerId)
      ctx.addIssue({ path: ['playerId'], code: 'custom', message: 'Requerido para Pokémon' });
    if (val.tcg === 'yugioh' && !val.konamiId)
      ctx.addIssue({ path: ['konamiId'], code: 'custom', message: 'Requerido para Yu-Gi-Oh!' });
  });

export type CreateFormData = z.infer<typeof createSchema>;
export type EditFormData = z.infer<typeof editSchema>;
export type CommonFormData = Omit<CreateFormData, 'password'> & { password?: string };

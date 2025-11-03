import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../components/forms/Input';
import { SelectTCG } from '../../components/forms/SelectTCG';
import { Container } from '../../components/layout/layout';
import { useRegister } from './hooks/useRegister';

const schema = z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  birthdate: z.string().min(1),
  nationality: z.string().min(1),
  tcg: z.enum(['pokemon', 'yugioh']),
  playerId: z.string().optional(),
  konamiId: z.string().optional(),
}).superRefine((val, ctx) => {
  if (val.tcg === 'pokemon' && !val.playerId) {
    ctx.addIssue({ path: ['playerId'], code: 'custom', message: 'Requerido para Pokémon' });
  }
  if (val.tcg === 'yugioh' && !val.konamiId) {
    ctx.addIssue({ path: ['konamiId'], code: 'custom', message: 'Requerido para Yu-Gi-Oh!' });
  }
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const mutation = useRegister();
  const navigate = useNavigate();
  const tcg = watch('tcg');

  return (
    <Container>
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <form
        onSubmit={handleSubmit((d) => mutation.mutate(d, { onSuccess: () => navigate('/') }))}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <Input label="Name" register={register('name')} error={errors.name} />
          <Input label="Lastname" register={register('lastname')} error={errors.lastname} />
        </div>
        <Input label="Email" type="email" register={register('email')} error={errors.email} />
        <Input label="Password" type="password" register={register('password')} error={errors.password} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Birthdate" type="date" register={register('birthdate')} error={errors.birthdate} />
          <Input label="Nationality" register={register('nationality')} error={errors.nationality} />
        </div>
        <SelectTCG register={register('tcg')} watch={watch} />
        {tcg === 'pokemon' && <Input label="Player ID" register={register('playerId')} error={errors.playerId} />}
        {tcg === 'yugioh' && <Input label="Konami ID" register={register('konamiId')} error={errors.konamiId} />}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-lg py-2.5 bg-black text-white hover:opacity-90 disabled:opacity-50"
        >
          {mutation.isPending ? 'Creating…' : 'Create account'}
        </button>
      </form>
    </Container>
  );
}

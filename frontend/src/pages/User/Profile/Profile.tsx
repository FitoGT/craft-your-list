import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { Container } from '../../../components/layout/layout';
import FormUser from '../components/formUser';
import { useUser } from '../hooks/useUser';
import { useUpdateUser } from '../hooks/useUpdateUser';

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useUser(id);
  const updateUser = useUpdateUser();
  const queryClient = useQueryClient();
  if (isLoading) return <Container><p>Cargando perfil…</p></Container>;
  if (error || !data) return <Container><p className="text-red-600">No se pudo cargar el usuario.</p></Container>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateUser = (form: any) => {
    if (!id) return;

    const payload = {
      id,
      data: {
        name: form.name,
        lastname: form.lastname,
        email: form.email,
        nationality: form.nationality,
        birthdate: form.birthdate
          ? new Date(form.birthdate).toISOString()
          : undefined,
        pokemonInfo: form.playerId ? { playerId: form.playerId } : null,
        yugiohInfo: form.konamiId ? { konamiId: form.konamiId } : null,
      },
    };

    updateUser.mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user', id] });
        toast.success('Profile updated succesfully');
      },
      onError: (e: unknown) => {
        let message = 'Error updating your profile';
        if (typeof e === 'object' && e !== null && 'response' in e) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const resp = (e as any).response;
          if (resp?.data?.message) {
            message = resp.data.message;
          }
        }
        toast.error(message);
      }
    });
  };

  const initial = {
    name: data.name,
    lastname: data.lastname,
    email: data.email,
    birthdate: data.birthdate?.slice(0, 10),
    nationality: data.nationality,
    tcg: (data.pokemonInfo
      ? 'pokemon'
      : data.yugiohInfo
        ? 'yugioh'
        : 'pokemon') as 'pokemon' | 'yugioh',
    playerId: data.pokemonInfo?.playerId ?? '',
    konamiId: data.yugiohInfo?.konamiId ?? '',
  };

  return (
    <Container>
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <FormUser
        mode="edit"
        initialValues={initial}
        submitting={updateUser.isPending}
        onSubmit={handleUpdateUser}
      />
      <Toaster
        position="top-right"
      />
    </Container>
  );
}

import { useParams } from 'react-router-dom';
import { Container } from '../../../components/layout/layout';
import FormUser from '../components/formUser';
import { useUser } from '../hooks/useUser';

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useUser(id);
  if (isLoading) return <Container><p>Cargando perfil…</p></Container>;
  if (error || !data) return <Container><p className="text-red-600">No se pudo cargar el usuario.</p></Container>;

  const initial = {
    name: data.name,
    lastname: data.lastname,
    email: data.email,
    birthdate: data.birthdate?.slice(0, 10), // YYYY-MM-DD
    nationality: data.nationality,
    // si tiene pokemonInfo => preselecciona pokemon; si no y tiene yugioh => yugioh; default pokemon
    tcg: (data.pokemonInfo ? 'pokemon' : data.yugiohInfo ? 'yugioh' : 'pokemon') as 'pokemon' | 'yugioh',
    playerId: data.pokemonInfo?.playerId ?? '',
    konamiId: data.yugiohInfo?.konamiId ?? '',
  };

  return (
    <Container>
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <FormUser
        mode="edit"
        initialValues={initial}
        onSubmit={(form) => {
          const payload = {
            name: form.name,
            lastname: form.lastname,
            email: form.email,
            birthdate: new Date(form.birthdate).toISOString(),
            nationality: form.nationality,
            pokemonInfo: form.playerId ? { playerId: form.playerId } : null,
            yugiohInfo: form.konamiId ? { konamiId: form.konamiId } : null,
          };
          console.log('PUT /users/:id', payload);
          alert('(Demo) Reemplaza con tu mutate() para guardar.');
        }}
      />
    </Container>
  );
}

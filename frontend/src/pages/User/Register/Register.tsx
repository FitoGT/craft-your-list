import { Container } from '../../../components/layout/layout';
import FormUser from '../components/formUser';
import { useRegister } from '../hooks/useRegister';

export default function Register() {
  const mutation = useRegister();

  return (
    <Container>
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <FormUser
        mode="create"
        onSubmit={(d) => mutation.mutate(d)}
        submitting={mutation.isPending}
      />
    </Container>
  );
}

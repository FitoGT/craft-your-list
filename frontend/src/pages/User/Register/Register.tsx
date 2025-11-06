import { Container } from '../../../components/layout/layout';
import FormUser from '../components/formUser';
import { useRegister } from '../hooks/useRegister';
import type { RegisterData } from '../interfaces';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const mutation = useRegister();

  const register = (form: RegisterData) => {
    mutation.mutate(form, {
      onSuccess: () => navigate('/'),
    });
  };

  return (
    <Container>
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <FormUser
        mode="create"
        onSubmit={(d: RegisterData) => register(d)}
        submitting={mutation.isPending}
      />
    </Container>
  );
}

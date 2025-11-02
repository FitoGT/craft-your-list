import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();
  const login = useLogin();
  const nav = useNavigate();

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <form onSubmit={handleSubmit((d) => login.mutate(d, { onSuccess: () => nav('/decklists') }))}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow space-y-4">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2" {...register('email')} />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input className="w-full border rounded px-3 py-2" type="password" {...register('password')} />
        </div>
        {login.isError && <p className="text-sm text-red-600">Invalid credentials</p>}
        <button className="w-full rounded-lg py-2.5 bg-black text-white">
          {login.isPending ? '...' : 'Enter'}
        </button>
        <p className="text-sm text-center">No account? <Link className="underline" to="/register">Register</Link></p>
      </form>
    </div>
  );
}

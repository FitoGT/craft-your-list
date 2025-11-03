import { useState } from 'react';
import { useLogin, logout, getCurrentUser } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = getCurrentUser();
  const nav = useNavigate();
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <nav className="w-full bg-gray-900 text-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-semibold tracking-wide">craft-your-list</Link>

        <div className="ml-auto flex items-center gap-3">
          {!user ? (
            <>
              <input
                className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm"
                placeholder="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm"
                placeholder="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={() => login.mutate({ email, password }, { onSuccess: () => nav('/') })}
                className="bg-white text-gray-900 rounded px-3 py-1.5 text-sm font-medium hover:opacity-90"
              >
                Log in
              </button>
              <Link
                to="/register"
                className="bg-gray-100 text-gray-900 rounded px-3 py-1.5 text-sm font-medium hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm">Hi, <b>{user.name}</b> 👋</span>
              <button
                onClick={() => { logout(); nav('/'); }}
                className="text-sm underline underline-offset-2"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

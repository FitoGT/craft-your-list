import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Decklists() {
  const nav = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('auth_token')) nav('/login');
  }, [nav]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-4">Decklists</h1>
      <p>Aquí vas a cargar y gestionar decklists (Pokémon / YGO).</p>
    </div>
  );
}

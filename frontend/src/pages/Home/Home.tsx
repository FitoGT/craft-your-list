import { useNavigate } from 'react-router-dom';

const tiles = [
  { key: 'pokemon', label: 'Pokémon' },
  { key: 'yugioh', label: 'Yu-Gi-Oh!' },
  { key: 'mtg', label: 'Magic: The Gathering' },
] as const;

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center bg-gray-50">
      <div className="max-w-5xl w-full px-6">
        <h1 className="text-3xl font-semibold text-center mb-8">Elige tu TCG</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
          {tiles.map(t => (
            <button
              key={t.key}
              onClick={() => nav(`/decklists/new/${t.key}`)}
              className="h-40 rounded-2xl bg-white shadow border border-gray-200
                         flex items-center justify-center text-xl font-medium
                         transition-transform duration-200 hover:scale-[1.03] active:scale-[0.99]"
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">Pronto agregamos logos oficiales.</p>
      </div>
    </div>
  );
}

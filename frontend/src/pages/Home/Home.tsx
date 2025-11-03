import { useNavigate } from 'react-router-dom';

const tiles = [
  { key: 'pokemon', label: 'Pokémon', img: '/pokemon.png' },
  { key: 'yugioh', label: 'Yu-Gi-Oh!', img: '/yugioh.png' },
  { key: 'mtg', label: 'Magic: The Gathering', img: '/magic.webp' },
] as const;

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center bg-gray-50">
      <div className="max-w-5xl w-full px-6">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Pick your TCG
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
          {tiles.map((t) => (
            <button
              key={t.key}
              onClick={() => nav(`/decklists/new/${t.key}`)}
              className="group relative h-52 rounded-2xl bg-white shadow border border-gray-200
                         overflow-hidden transition-transform duration-200 hover:scale-[1.03]
                         active:scale-[0.99] flex flex-col items-center justify-center"
            >
              <img
                src={t.img}
                alt={t.label}
                className="h-24 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Pick a TCG and generate your decklist.
        </p>
      </div>
    </div>
  );
}

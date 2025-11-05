import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGenerateDecklist } from './hooks/useCreateDecklist';
import { getCurrentUser } from '../../hooks/useAuth';
import type { DecklistPayload } from './types';

export default function CreateDecklist() {
  const { tcg } = useParams<{ tcg: 'pokemon' | 'yugioh' | 'mtg' }>();
  const [raw, setRaw] = useState('');
  const generateDecklist = useGenerateDecklist();
  const user = getCurrentUser();

  const onCreate = () => {


    const payload: DecklistPayload = {
      rawList: raw,
      userId: user?.id,
      tcg
    };

    generateDecklist.mutate(payload, {
      onSuccess: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'decklist.pdf';
        a.click();
        URL.revokeObjectURL(url);
      },
      onError: (err) => {
        console.error(err);
        alert('Error generando el PDF.');
      },
    });
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Nuevo decklist</h2>
          <span className="text-sm px-2 py-1 bg-gray-100 rounded border">{tcg?.toUpperCase()}</span>
        </div>

        <label className="block text-sm font-medium">Pega tu lista</label>
        <textarea
          rows={14}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={`Pega aquí tu export de ${tcg?.toUpperCase()}`}
          className="w-full border rounded-lg p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-gray-300"
        />

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCreate}
            className="rounded-lg px-4 py-2 bg-black text-white disabled:opacity-50 hover:opacity-90"
          >
            Crear decklist
          </button>
        </div>


      </div>
    </div>
  );
}

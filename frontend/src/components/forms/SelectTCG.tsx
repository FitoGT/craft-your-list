import type { UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';

type Props = {
  register: UseFormRegisterReturn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
};

export const SelectTCG = ({ register, watch }: Props) => {
  const tcg = watch('tcg');
  return (
    <div>
      <label className="block text-sm mb-1">TCG</label>
      <div className="flex gap-4">
        <label className="inline-flex items-center gap-2">
          <input type="radio" value="pokemon" {...register} />
          Pokémon
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" value="yugioh" {...register} />
          Yu-Gi-Oh!
        </label>
      </div>
      {tcg === 'pokemon' && <p className="text-xs text-gray-600 mt-1">Ingresa tu Player ID</p>}
      {tcg === 'yugioh' && <p className="text-xs text-gray-600 mt-1">Ingresa tu Konami ID</p>}
    </div>
  );
};

import type { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  register: UseFormRegisterReturn;
};

export const SelectTCG = ({ register }: Props) => {
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
    </div>
  );
};

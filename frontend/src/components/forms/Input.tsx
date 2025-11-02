import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label: string;
  register: UseFormRegisterReturn;
  type?: string;
  error?: FieldError;
};

export const Input = ({ label, register, type = 'text', error }: Props) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <input type={type} {...register} className="w-full border rounded px-3 py-2" />
    {error && <p className="text-sm text-red-600">{error.message}</p>}
  </div>
);

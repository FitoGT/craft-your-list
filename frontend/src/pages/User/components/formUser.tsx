import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSchema, editSchema, type CommonFormData, type CreateFormData, type EditFormData } from '../../../pages/User/schemas';
import { Input } from '../../../components/forms/Input';
import { SelectTCG } from '../../../components/forms/SelectTCG';

type BaseProps = {
  submitting?: boolean;
  initialValues?: Partial<CommonFormData>;
};

type CreateProps = BaseProps & {
  mode: 'create';
  onSubmit: (values: CreateFormData) => void | Promise<void>;
};

type EditProps = BaseProps & {
  mode: 'edit';
  onSubmit: (values: EditFormData) => void | Promise<void>;
};

type Props = CreateProps | EditProps;

export default function FormUser(props: Props) {
  const isCreate = props.mode === 'create';
  const resolver = zodResolver(isCreate ? createSchema : editSchema);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommonFormData>({
    resolver,
    defaultValues: {
      name: '', lastname: '', email: '',
      birthdate: '', nationality: '',
      tcg: 'pokemon', playerId: '', konamiId: '',
      password: '',
      ...(props.initialValues || {}),
    },
  });

  useEffect(() => {
    if (!props.initialValues) return;
    reset({ ...props.initialValues, password: '' });
  }, [props.initialValues, reset]);

  const tcg = watch('tcg');

  const onSubmit = (values: CommonFormData) => {
    if (isCreate) {
      props.onSubmit(values as CreateFormData);
    } else {
      props.onSubmit(values as EditFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Name" register={register('name')} error={errors.name} />
        <Input label="Lastname" register={register('lastname')} error={errors.lastname} />
      </div>

      <Input label="Email" type="email" register={register('email')} error={errors.email} />

      <div className="grid grid-cols-2 gap-3">
        <Input label="Birthdate" type="date" register={register('birthdate')} error={errors.birthdate} />
        <Input label="Nationality" register={register('nationality')} error={errors.nationality} />
      </div>

      <SelectTCG register={register('tcg')} />

      {tcg === 'pokemon' && (
        <Input label="Player ID" register={register('playerId')} error={errors.playerId} />
      )}
      {tcg === 'yugioh' && (
        <Input label="Konami ID" register={register('konamiId')} error={errors.konamiId} />
      )}

      {isCreate && (
        <Input label="Password" type="password" register={register('password')} error={errors.password} />
      )}

      <button
        type="submit"
        disabled={props.submitting || isSubmitting}
        className="w-full rounded-lg py-2.5 bg-black text-white hover:opacity-90 disabled:opacity-50"
      >
        {props.submitting || isSubmitting
          ? (isCreate ? 'Creating…' : 'Saving…')
          : (isCreate ? 'Create account' : 'Save changes')}
      </button>
    </form>
  );
}
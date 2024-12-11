import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  base: z.string().min(1, 'Base currency is required'),
  quote: z.string().min(1, 'Quote currency is required'),
  interval: z.number().min(1, 'Interval must be greater than 0'),
});

type FormData = z.infer<typeof schema>;

interface PairFormProps {
  onSubmit: (data: FormData) => void;
}

export const PairForm: React.FC<PairFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitForm = (data: FormData) => {
    const transformedData = {
      ...data,
      base: data.base.toUpperCase(),
      quote: data.quote.toUpperCase(),
      interval: Number(data.interval),
    };
  
    onSubmit(transformedData)
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input {...register('base')} placeholder="Base Currency" />
      {errors.base && <span>{errors.base.message}</span>}

      <input {...register('quote')} placeholder="Quote Currency" />
      {errors.quote && <span>{errors.quote.message}</span>}

      <input
        {...register('interval', {
          setValueAs: (value) => (value ? Number(value) : 0),
        })}
        type="number"
        placeholder="Update Interval"
      />
      {errors.interval && <span>{errors.interval.message}</span>}

      <button type="submit">Add Pair</button>
    </form>
  );
};

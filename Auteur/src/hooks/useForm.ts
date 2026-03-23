import { useState, useCallback } from 'react';

export interface FormState {
  readonly title: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly genre: string;
  readonly rating: string;
  readonly quality: number;
  readonly budget: number;
  readonly inProduction: boolean;
  readonly released: boolean;
}

const initialState: FormState = {
  title: '',
  name: '',
  email: '',
  phone: '',
  genre: 'Action',
  rating: 'PG',
  quality: 50,
  budget: 50,
  inProduction: false,
  released: false,
};

export const useForm = () => {
  const [formState, setFormState] = useState<FormState>(initialState);

  const updateField = useCallback(
    (field: keyof FormState, value: unknown) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const reset = useCallback(() => {
    setFormState(initialState);
  }, []);

  return { formState, updateField, reset };
};

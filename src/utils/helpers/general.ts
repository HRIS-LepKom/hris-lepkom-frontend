import { ChangeEvent } from 'react';

export const handleNumericInput = (e: ChangeEvent<HTMLInputElement>) => {
  return e.target.value === '' || /^\d+$/.test(e.target.value);
};

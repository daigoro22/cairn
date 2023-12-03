import type { ReactElement } from 'react';
import { inputContainer, inputLabel } from './styles/input';
import type { FieldError } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

export default function InputContainer({
  label,
  children,
  error,
}: {
  label: string;
  error?: FieldError;
  children: ReactElement<HTMLInputElement> | string;
}) {
  return (
    <div className={inputContainer()}>
      <label className={inputLabel()}>{label}</label>
      <ErrorMessage error={error} />
      {children}
    </div>
  );
}

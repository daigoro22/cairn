import type { ReactElement } from 'react';
import { inputContainer, inputLabel } from './styles/input';

export default function InputContainer({
  label,
  children,
}: {
  label: string;
  children: ReactElement<HTMLInputElement> | string;
}) {
  return (
    <div className={inputContainer()}>
      <label className={inputLabel()}>{label}</label>
      {children}
    </div>
  );
}

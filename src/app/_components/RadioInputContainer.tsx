import { css } from 'styled-system/css';
import { inputContainer, inputLabel } from './styles/input';
import type { PropsWithChildren } from 'react';
import type { FieldError } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

export default function RadioInputContainer({
  children,
  error,
}: PropsWithChildren & { error?: FieldError }) {
  return (
    <fieldset className={inputContainer()}>
      <ErrorMessage error={error} />
      <legend className={inputLabel()}>性別</legend>
      <div
        className={css({
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'flex-start',
        })}
      >
        {children}
      </div>
    </fieldset>
  );
}

import { css } from 'styled-system/css';
import { input } from './styles/input';
import { forwardRef, type InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

const CheckBoxInput = forwardRef<HTMLInputElement, Props>(
  function CheckBoxInput({ label, error, ...args }, ref) {
    return (
      <div
        className={css({ display: 'flex', flexDirection: 'column', gap: 'xs' })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          })}
        >
          <input {...args} type="checkbox" className={input()} ref={ref} />
          <label htmlFor={args.name}>{label}</label>
        </div>
        <ErrorMessage error={error} />
      </div>
    );
  },
);

export default CheckBoxInput;

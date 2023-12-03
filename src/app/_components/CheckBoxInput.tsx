import { css } from 'styled-system/css';
import { input } from './styles/input';
import { forwardRef, type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };

const CheckBoxInput = forwardRef<HTMLInputElement, Props>(
  function CheckBoxInput({ label, ...args }, ref) {
    return (
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
    );
  },
);

export default CheckBoxInput;

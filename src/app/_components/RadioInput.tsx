import { forwardRef, type InputHTMLAttributes } from 'react';
import { css } from 'styled-system/css';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  label: string;
};

const RadioInput = forwardRef<HTMLInputElement, Props>(function RadioInput(
  { value, label, ...args },
  ref,
) {
  return (
    <div className={css({ marginX: 'md' })}>
      <input
        {...args}
        value={value}
        className={css({
          padding: 'md',
          marginRight: 'xs',
        })}
        type="radio"
        ref={ref}
      />
      <label className={css({ fontSize: 'md' })} htmlFor={args.id}>
        {label}
      </label>
    </div>
  );
});

export default RadioInput;

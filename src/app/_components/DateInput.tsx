import { forwardRef, type InputHTMLAttributes } from 'react';
import { input } from './styles/input';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const DateInput = forwardRef<HTMLInputElement, Props>(function DateInput(
  { ...args },
  ref,
) {
  return (
    <input
      type="date"
      className={input({ marginX: 'none' })}
      ref={ref}
      {...args}
    />
  );
});

export default DateInput;

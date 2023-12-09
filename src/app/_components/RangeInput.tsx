import { css } from 'styled-system/css';
import { input } from './styles/input';
import {
  forwardRef,
  type InputHTMLAttributes,
  type PropsWithChildren,
} from 'react';

type Props = PropsWithChildren<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'list'>
>;

const RangeInput = forwardRef<HTMLInputElement, Props>(function RangeInput(
  { children, ...rest }: Props,
  ref,
) {
  return (
    <>
      <input
        className={input()}
        type="range"
        list="values"
        {...rest}
        ref={ref}
      />
      <datalist
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: 'md',
        })}
        id="values"
      >
        {children}
      </datalist>
    </>
  );
});

export default RangeInput;

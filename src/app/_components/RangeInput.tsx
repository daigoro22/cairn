import { css } from 'styled-system/css';
import { input } from './styles/input';
import type { InputHTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'list'>
>;

export default function RangeInput({ children, ...rest }: Props) {
  return (
    <>
      <input className={input()} type="range" list="values" {...rest} />
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
}

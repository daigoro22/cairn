import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { button } from './styles/input';

export default function Button({
  children,
  variant = 'primary',
  ...rest
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'tertiary';
  }
>) {
  return (
    <button {...rest} className={button({ visual: variant })}>
      {children}
    </button>
  );
}

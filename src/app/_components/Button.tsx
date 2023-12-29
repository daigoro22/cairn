import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import { button } from './styles/input';
import { css } from 'styled-system/css';

export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  ...rest
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'tertiary';
    isLoading?: boolean;
  }
>) {
  return (
    <button {...rest} className={button({ visual: variant })}>
      {!isLoading ? (
        children
      ) : (
        <div
          className={css({
            position: 'absolute',
            top: '0',
            left: '50%',
            borderY: 'loader.fill',
            borderLeft: 'loader.fill',
            borderRight: 'loader.empty',
            width: 'loader',
            height: 'loader',
            borderRadius: '50%',
            animation: 'loader 1s infinite linear',
          })}
        />
      )}
    </button>
  );
}

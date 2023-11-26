import type { PropsWithChildren } from 'react';
import { css } from 'styled-system/css';

export default function FloatMenu({ children }: PropsWithChildren) {
  return (
    <div
      className={css({
        transition: 'all 0.3s ease-in-out',
        opacity: { base: 0, _groupHover: 1 },
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bg: 'white',
        width: 'menu.width',
        maxHeight: 'menu.maxHeight',
        padding: 'xs',
        border: 'primary',
        display: 'flex',
        flexDirection: 'column',
        gap: 'xs',
      })}
    >
      {children}
    </div>
  );
}

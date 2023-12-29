import { type PropsWithChildren } from 'react';
import { css } from 'styled-system/css';

export default function FloatMenu({
  children,
  opened,
}: PropsWithChildren<{ opened: boolean }>) {
  return opened ? (
    <div
      className={css({
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
  ) : undefined;
}

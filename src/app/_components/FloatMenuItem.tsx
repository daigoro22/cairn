import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

export default function FloatMenuItem({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'flex-start',
        columnGap: 'xs',
        marginLeft: 'xs',
        color: '{primary.dark}',
      })}
    >
      {icon}
      <p className={css({ color: 'primary.dark', marginLeft: 'xs' })}>
        {label}
      </p>
    </div>
  );
}

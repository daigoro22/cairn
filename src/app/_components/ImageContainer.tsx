import { cva } from 'styled-system/css';
import type { PropsWithChildren } from 'react';

const styleObject = {
  base: { position: 'relative' },
  variants: { size: { header: { width: 'header', height: 'header' } } },
} as const;

const iconContainer = cva(styleObject);

export default function ImageContainer({
  children,
  size,
}: PropsWithChildren<{ size: keyof typeof styleObject.variants.size }>) {
  return <div className={iconContainer({ size })}>{children}</div>;
}

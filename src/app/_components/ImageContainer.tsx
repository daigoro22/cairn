import { cva } from 'styled-system/css';
import type { PropsWithChildren } from 'react';

const styleObject = {
  base: { position: 'relative' },
  variants: {
    size: {
      header: { width: 'header', height: 'header' },
      'icon.menu': { width: 'icon.menu', height: 'icon.menu' },
      'icon.reviewCard': {
        width: 'icon.reviewCard',
        height: 'icon.reviewCard',
      },
      'item.review': { width: 'item.review', height: 'item.review' },
      'item.top': { width: 'item.top', height: 'item.top' },
    },
  },
} as const;

const iconContainer = cva(styleObject);

export default function ImageContainer({
  children,
  size,
}: PropsWithChildren<{ size: keyof typeof styleObject.variants.size }>) {
  return <div className={iconContainer({ size })}>{children}</div>;
}

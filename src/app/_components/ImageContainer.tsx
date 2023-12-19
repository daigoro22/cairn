import type { RecipeVariantProps } from 'styled-system/css';
import { cva } from 'styled-system/css';
import type { PropsWithChildren } from 'react';

const iconContainer = cva({
  base: {
    position: 'relative',
    overflow: 'hidden',
    // bg: 'blue',
  },
  variants: {
    size: {
      header: { width: 'header.width', height: 'header.height' },
      'icon.menu': { width: 'icon.menu', height: 'icon.menu' },
      'icon.reviewCard': {
        width: 'icon.reviewCard',
        height: 'icon.reviewCard',
      },
      'item.review': { width: 'item.review', height: 'item.review' },
      'item.top': { width: 'item.top', height: 'item.top' },
      'item.itemModal': { width: 'item.itemModal', height: 'item.itemModal' },
    },
    border: {
      card: { borderTopRadius: 'card.xs' },
      circle: { borderRadius: '50%', border: 'primary' },
    },
  },
});

type Props = RecipeVariantProps<typeof iconContainer>;
export default function ImageContainer({
  children,
  ...rest
}: PropsWithChildren<Props>) {
  return <div className={iconContainer(rest)}>{children}</div>;
}

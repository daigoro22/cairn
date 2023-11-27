import { cva } from 'styled-system/css';

export const mainAreaLabel = cva({
  base: { fontSize: 'xl', paddingY: 'xl' },
  variants: {
    grid: {
      md: { gridColumn: '5/9' },
      lg: { gridColumn: '1/7', gridRow: '1/2' },
    },
  },
  defaultVariants: { grid: 'md' },
});

export const menuIcon = cva({
  base: { width: 'lg', height: 'lg', color: 'primary.dark' },
});

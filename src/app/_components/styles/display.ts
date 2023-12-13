import { cva } from 'styled-system/css';

export const mainAreaLabel = cva({
  base: {
    fontSize: { base: 'lg', lg: 'xl' },
    paddingY: 'xl',
    paddingLeft: { base: 'md', lg: 'none' },
  },
  variants: {
    grid: {
      md: { gridColumn: '5/9' },
      lg: { gridColumn: '1/7', gridRow: '1/2' },
      xl: { gridColumn: '1/5', gridRow: '1/2' },
    },
  },
  defaultVariants: { grid: 'md' },
});

export const menuIcon = cva({
  base: { width: 'lg', height: 'lg', color: 'primary.dark' },
});

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
      xl: { gridColumn: { base: '1/5', lg: '1/7' }, gridRow: '1/2' },
    },
  },
  defaultVariants: { grid: 'md' },
});

export const menuIcon = cva({
  base: { width: 'lg', height: 'lg', color: 'primary.dark' },
});

import { cva } from 'styled-system/css';

export const mainAreaLabel = cva({
  base: { fontSize: 'xl', gridColumn: '5/9', paddingY: 'xl' },
});

export const menuIcon = cva({
  base: { width: 'lg', height: 'lg', color: 'primary.dark' },
});

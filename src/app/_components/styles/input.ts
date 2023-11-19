import { cva } from 'styled-system/css';

export const input = cva({
  base: {
    height: 'xl',
    fontSize: 'md',
    border: 'primary',
    boxSizing: 'border-box',
    borderRadius: 'input',
  },
});

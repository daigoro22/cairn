import { cva } from 'styled-system/css';

export const mainAreaGrid = cva({
  base: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1/13',
    alignItems: 'center',
  },
});

export const card = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    bg: 'white',
    padding: 'xl',
    borderRadius: 'card',
  },
});

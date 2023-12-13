import { cva } from 'styled-system/css';

export const mainAreaGrid = cva({
  base: {
    display: 'grid',
    gridColumn: '1/13',
    gridRow: '1/13',
    alignItems: 'center',
  },
  variants: {
    grid: {
      md: {
        gridTemplateColumns:
          'repeat(4,minmax(0,1fr)) repeat(4,8rem) repeat(4,minmax(0,1fr))',
        gridTemplateRows: 'repeat(10,minmax(0,1fr))',
        gridColumnGap: 'gridGap.md',
        gridRowGap: 'gridGap.md',
      },
      lg: {
        gridTemplateColumns: {
          base: 'repeat(6,auto)',
          lg: 'repeat(3,minmax(0,1fr)) repeat(6,8rem) repeat(3,minmax(0,1fr))',
        },
        gridTemplateRows: { base: 'repeat(6,auto)', lg: 'repeat(10,auto)' },
        gridColumnGap: { base: 'gridGap.md', lg: 'gridGap.lg' },
        gridRowGap: { base: 'gridGap.sm', lg: 'gridGap.lg' },
      },
      xl: {
        gridTemplateColumns: {
          base: 'repeat(4,minmax(4rem,1fr))',
          sm: 'repeat(6,minmax(4rem,1fr))',
          lg: 'repeat(3,minmax(0,1fr)) repeat(6,8rem) repeat(3,minmax(0,1fr))',
        },
        gridTemplateRows: { base: 'repeat(6,auto)', lg: 'repeat(10,auto)' },
        gridColumnGap: {
          base: 'gridGap.sm',
          sm: 'gridGap.md',
          lg: 'gridGap.lg',
        },
        gridRowGap: { base: 'gridGap.sm', lg: 'gridGap.lg' },
      },
    },
  },
  defaultVariants: { grid: 'md' },
});

export const subGrid = cva({
  base: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridTemplateRows: 'subgrid',
  },
});

export const card = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    bg: 'white',
    borderRadius: 'card.md',
  },
  variants: {
    padding: {
      xl: { padding: 'xl' },
      sm: { padding: 'sm' },
    },
  },
  defaultVariants: { padding: 'xl' },
});

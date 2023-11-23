import { cva } from 'styled-system/css';

export const input = cva({
  base: {
    height: 'xl',
    padding: 'md',
    marginLeft: 'xs',
    marginRight: 'xs',
    marginTop: 'xs',
    marginBottom: 'xs',
    fontSize: 'md',
    border: 'primary',
    boxSizing: 'border-box',
    borderRadius: 'input',
  },
});

export const inputLabel = cva({
  base: {
    height: 'xl',
    padding: 'md',
    marginTop: 'xs',
    marginBottom: 'xs',
    fontSize: 'md',
    boxSizing: 'border-box',
  },
});

export const inputContainer = cva({
  base: { display: 'flex', flexDirection: 'column' },
});

export const button = cva({
  base: {
    borderRadius: '0.25rem',
    width: '5rem',
    height: '2.5rem',
    fontSize: 'md',
  },
  variants: {
    visual: {
      primary: {
        backgroundColor: 'primary.light',
        color: 'primary.dark',
        border: 'primary',
      },
      secondary: {
        backgroundColor: 'secondary.light',
        color: 'secondary.dark',
        border: 'secondary',
      },
      tertiary: {
        backgroundColor: 'tertiary.light',
        color: 'tertiary.dark',
        border: 'tertiary',
      },
    },
  },
});

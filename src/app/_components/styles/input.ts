import { cva } from 'styled-system/css';

export const inputStyleObject = {
  base: {
    height: 'xl',
    width: '100%',
    padding: 'md',
    marginTop: 'xs',
    marginBottom: 'xs',
    fontSize: 'md',
    border: 'primary',
    boxSizing: 'border-box',
    borderRadius: 'input',
  },
  variants: {
    marginX: { xs: { marginLeft: 'xs', marginRight: 'xs' }, none: {} },
  },
  defaultVariants: { marginX: 'xs' },
} as const;
export const input = cva(inputStyleObject);

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

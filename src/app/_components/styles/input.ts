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

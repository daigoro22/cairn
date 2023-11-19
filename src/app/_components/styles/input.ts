import { cva } from 'styled-system/css';

export const input = cva({
  base: {
    height: 'xl',
    padding: 'md',
    marginLeft: 'xs',
    marginRight: 'xs',
    fontSize: 'md',
    border: 'primary',
    boxSizing: 'border-box',
    borderRadius: 'input',
  },
});

export const radioAndCheckboxContainer = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

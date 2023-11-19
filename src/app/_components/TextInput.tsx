'use client';

import React, { InputHTMLAttributes } from 'react';
import { css } from 'styled-system/css';
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function TextInput({ ...args }: Props) {
  return (
    <input
      className={css({
        height: 'xl',
        fontSize: 'md',
        border: 'primary',
        boxSizing: 'border-box',
        borderRadius: 'input',
      })}
      type="text"
      {...args}
    />
  );
}

'use client';

import type { InputHTMLAttributes } from 'react';
import React from 'react';
import { css } from 'styled-system/css';
type TypeAttribute = Extract<
  Pick<InputHTMLAttributes<HTMLInputElement>, 'type'>['type'],
  'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
>;
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: TypeAttribute;
};

export default function TextInput({ type = 'text', ...args }: Props) {
  return (
    <input
      className={css({
        height: 'xl',
        fontSize: 'md',
        border: 'primary',
        boxSizing: 'border-box',
        borderRadius: 'input',
      })}
      type={type}
      {...args}
    />
  );
}

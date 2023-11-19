import type { InputHTMLAttributes } from 'react';
import React from 'react';
import { input } from './styles/input';

type TypeAttribute = Extract<
  Pick<InputHTMLAttributes<HTMLInputElement>, 'type'>['type'],
  'email' | 'password' | 'search' | 'tel' | 'text' | 'url'
>;
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: TypeAttribute;
};

export default function TextInput({ type = 'text', ...args }: Props) {
  return <input className={input()} type={type} {...args} />;
}

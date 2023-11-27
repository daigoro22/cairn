import type { InputHTMLAttributes } from 'react';
import React from 'react';
import type { inputStyleObject } from './styles/input';
import { input } from './styles/input';

type TypeAttribute = Extract<
  Pick<InputHTMLAttributes<HTMLInputElement>, 'type'>['type'],
  'email' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'number'
>;
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: TypeAttribute;
  variants?: {
    [key in keyof typeof inputStyleObject.variants]?: keyof (typeof inputStyleObject.variants)[key];
  };
};

export default function TextInput({
  type = 'text',
  variants = {},
  ...args
}: Props) {
  return <input className={input(variants)} type={type} {...args} />;
}

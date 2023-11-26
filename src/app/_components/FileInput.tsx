import type { InputHTMLAttributes } from 'react';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function FileInput({ ...args }: Props) {
  return <input type="file" {...args} />;
}

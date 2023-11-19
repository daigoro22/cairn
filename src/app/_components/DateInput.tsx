import type { InputHTMLAttributes } from 'react';
import { input } from './styles/input';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function DateInput({ ...args }: Props) {
  return <input type="date" className={input()} {...args} />;
}

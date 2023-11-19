import { css } from 'styled-system/css';
import { input } from './styles/input';

export default function RadioInput({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      })}
    >
      <input name={name} value={value} className={input()} type="radio" />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

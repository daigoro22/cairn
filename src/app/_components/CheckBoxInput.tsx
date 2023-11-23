import { css } from 'styled-system/css';
import { input } from './styles/input';

export default function CheckBoxInput({
  name,
  label,
}: {
  name: string;
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
      <input id={name} name={name} type="checkbox" className={input()} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

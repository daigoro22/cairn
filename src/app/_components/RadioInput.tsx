import { css } from 'styled-system/css';

export default function RadioInput({
  id,
  name,
  value,
  label,
}: {
  id: string;
  name: string;
  value: string;
  label: string;
}) {
  return (
    <div className={css({ marginX: 'md' })}>
      <input
        id={id}
        name={name}
        value={value}
        className={css({
          padding: 'md',
          marginRight: 'xs',
        })}
        type="radio"
      />
      <label className={css({ fontSize: 'md' })} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

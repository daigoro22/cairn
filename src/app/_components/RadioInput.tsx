import { input, radioAndCheckboxContainer } from './styles/input';

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
    <div className={radioAndCheckboxContainer()}>
      <input
        id={name}
        name={name}
        value={value}
        className={input()}
        type="radio"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

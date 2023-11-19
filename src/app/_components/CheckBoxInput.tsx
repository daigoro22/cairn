import { input, radioAndCheckboxContainer } from './styles/input';

export default function CheckBoxInput({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  return (
    <div className={radioAndCheckboxContainer()}>
      <input id={name} name={name} type="checkbox" className={input()} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

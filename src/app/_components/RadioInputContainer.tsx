import { css } from 'styled-system/css';
import { inputContainer, inputLabel } from './styles/input';
import type { PropsWithChildren } from 'react';

export default function RadioInputContainer({ children }: PropsWithChildren) {
  return (
    <fieldset className={inputContainer()}>
      <legend className={inputLabel()}>性別</legend>
      <div
        className={css({
          paddingRight: 'md',
          paddingLeft: 'md',
          marginTop: 'xs',
          marginBottom: 'xs',
          boxSizing: 'border-box',
        })}
      >
        {children}
      </div>
    </fieldset>
  );
}

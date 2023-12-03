import type { FieldError } from 'react-hook-form';
import { css } from 'styled-system/css';

export default function ErrorMessage({ error }: { error?: FieldError }) {
  {
    return error?.message ? (
      <p className={css({ color: 'red', fontSize: '0.75rem' })}>
        {error?.message}
      </p>
    ) : undefined;
  }
}

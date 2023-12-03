import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

const FileInput = forwardRef<HTMLInputElement, Props>(function FileInput(
  { ...args },
  ref,
) {
  return <input type="file" {...args} ref={ref} />;
});

export default FileInput;

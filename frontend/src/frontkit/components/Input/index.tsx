import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './index.module.css';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  scale?: 'normal' | 'big'; // not `size` because `size` is a native <input> attribute
  wide?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, scale = 'normal', wide, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(styles.core, styles[scale], wide && 'w-full', className)}
      {...rest}
    />
  );
});

import clsx from 'clsx';
import { forwardRef } from 'react';

export const A = forwardRef<HTMLAnchorElement, JSX.IntrinsicElements['a']>(
  function A({ className, ...rest }, ref) {
    return <a ref={ref} className={clsx('link', className)} {...rest} />;
  }
);

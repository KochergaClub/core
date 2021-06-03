import { forwardRef } from 'react';

// Fonts are similar to Label, but uses different colors;
// useful on colored backgrounds.
export const LabelA = forwardRef<HTMLAnchorElement, JSX.IntrinsicElements['a']>(
  function LabelA({ className, ...rest }, ref) {
    return (
      <a
        ref={ref}
        className={`text-sm font-medium text-primary-300 no-underline hover:underline ${
          className || ''
        }`}
        {...rest}
      />
    );
  }
);

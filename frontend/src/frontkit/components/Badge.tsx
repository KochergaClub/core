import 'tippy.js/dist/tippy.css';

import clsx from 'clsx';

import Tippy from '@tippyjs/react';

interface InnerProps {
  type?: 'accent' | 'default' | 'good';
  color?: string;
}

interface Props extends InnerProps {
  hint?: string;
}

export const InnerBadge: React.FC<InnerProps> = ({
  type = 'default',
  color,
  children,
}) => (
  <div
    className={clsx(
      'inline-block rounded-xl px-2 py-0.5 text-xs whitespace-nowrap',
      {
        accent: 'bg-accent-500',
        default: 'bg-primary-300',
        good: 'bg-green-300',
      }[type]
    )}
    style={{
      ...(color && { backgroundColor: color }),
    }}
  >
    {children}
  </div>
);

export const Badge: React.FC<Props> = ({ children, hint, ...innerProps }) => {
  const inner = <InnerBadge {...innerProps}>{children}</InnerBadge>;

  return hint ? <Tippy content={hint}>{inner}</Tippy> : inner;
};

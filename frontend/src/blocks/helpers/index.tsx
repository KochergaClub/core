import clsx from 'clsx';

export const Container: React.FC<{ grey?: boolean }> = ({ grey, children }) => (
  <div className={clsx('mx-auto py-12', grey && 'bg-gray-100')}>{children}</div>
);

export const TLHeader: React.FC<{ size: 'normal' | 'large' }> = ({
  size,
  children,
}) => (
  <div
    className={clsx(
      'text-center font-semibold text-3xl',
      {
        normal: 'sm:text-4xl',
        large: 'sm:text-6xl',
      }[size]
    )}
  >
    {children}
  </div>
);

export const TLDescription: React.FC<{ large?: boolean }> = ({
  large,
  children,
}) => (
  <div
    className={clsx(
      'mx-auto max-w-5xl px-5 text-center',
      large && 'sm:text-2xl text-xl'
    )}
  >
    {children}
  </div>
);

import clsx from 'clsx';

import styles from './index.module.css';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'tiny' | 'small' | 'normal' | 'big';
  kind?: 'primary' | 'danger' | 'default';
  loading?: boolean;
}

export const Button: React.FC<Props> = ({
  kind = 'default',
  size = 'normal',
  loading,
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles['btn'],
        styles[`size-${size}`],
        styles[`kind-${kind}`],
        loading
          ? 'bg-transparent hover:bg-transparent'
          : styles[`kind-${kind}-bg`],
        className
      )}
      {...rest}
    >
      {loading && (
        <div className={clsx(styles['back'], styles[`back-${kind}`])} />
      )}
      {children}
    </button>
  );
};

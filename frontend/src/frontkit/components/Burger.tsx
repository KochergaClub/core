import clsx from 'clsx';
import * as React from 'react';

import styles from './Burger.module.scss';

export interface Props {
  opened?: boolean;
  flip: () => void;
  colorClass?: string;
}

export const Burger: React.FC<Props> = ({
  opened,
  flip,
  colorClass = 'bg-black',
}) => {
  return (
    <div
      className={clsx(opened && styles.opened, styles.burger)}
      onClick={flip}
    >
      <span className={colorClass} />
      <span className={colorClass} />
      <span className={colorClass} />
      <span className={colorClass} />
    </div>
  );
};

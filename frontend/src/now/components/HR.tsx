import clsx from 'clsx';
import { useContext } from 'react';

import { NowThemeContext } from '../contexts';

export const HR: React.FC = () => {
  const theme = useContext(NowThemeContext);

  return (
    <hr className={clsx('h-px bg-gray-400 my-12', theme.tv && 'hidden')} />
  );
};

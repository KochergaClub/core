import { useCallback, useContext, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { BasicSpinner } from '../Spinner';
import { ActionLayout } from './ActionLayout';
import { DropdownMenuContext } from './contexts';
import { CommonActionProps } from './types';

interface Props extends CommonActionProps {
  act?: () => Promise<void>;
  syncAct?: () => void;
  children?: null;
}

export const Action: React.FC<Props> = ({ act, syncAct, title, icon }) => {
  const { close } = useContext(DropdownMenuContext);
  const [acting, setActing] = useState(false);

  const cb = useCallback(async () => {
    setActing(true);
    if (syncAct) {
      syncAct();
    }
    if (act) {
      await act();
    }
    close();
    setActing(false);
  }, [act, syncAct, close]);

  return (
    <ActionLayout
      onClick={cb}
      title={title}
      icon={acting ? BasicSpinner : icon || FaArrowRight}
    />
  );
};

import { useContext, useCallback } from 'react';
import { DropdownMenuContext } from './contexts';

import ActionContainer from './ActionContainer';

interface Props {
  act?: () => Promise<void>;
  syncAct?: () => void;
}

const Action: React.FC<Props> = ({ act, syncAct, children }) => {
  const { close } = useContext(DropdownMenuContext);

  const cb = useCallback(async () => {
    if (syncAct) {
      syncAct();
    }
    if (act) {
      await act();
    }
    close();
  }, [act, syncAct, close]);

  return <ActionContainer onClick={cb}>{children}</ActionContainer>;
};

export default Action;

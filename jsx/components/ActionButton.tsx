import React, { useCallback, useState, useContext } from 'react';

import { Button } from '@kocherga/frontkit';

import GlobalContext from './GlobalContext';

interface Props {
  path: string;
  children?: React.ReactNode;
  onSuccess?: (result: any) => void;
}

const ActionButton = ({ path, children, onSuccess }: Props) => {
  const { api } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const cb = useCallback(
    async () => {
      setLoading(true);
      const result = await api.call(path, 'POST');
      if (onSuccess) {
        onSuccess(result);
      }
      setLoading(false);
    },
    [path]
  );
  return (
    <Button loading={loading} disabled={loading} onClick={cb}>
      {children}
    </Button>
  );
};

export default ActionButton;

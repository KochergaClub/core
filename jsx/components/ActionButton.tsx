import React, { useCallback, useState } from 'react';

import { Button } from '@kocherga/frontkit';

import { useAPI } from '../common/hooks';

interface Props {
  path: string;
  children?: React.ReactNode;
  onSuccess?: (result: any) => void;
  // Option for quick-and-dirty solutions - don't have to integrate the state change to the existing page.
  // This option has a higher priority than onSuccess.
  reloadOnSuccess?: boolean;
}

const ActionButton = ({
  path,
  children,
  onSuccess,
  reloadOnSuccess,
}: Props) => {
  const api = useAPI();
  const [loading, setLoading] = useState(false);

  const cb = useCallback(
    async () => {
      setLoading(true);
      const result = await api.call(path, 'POST');
      if (reloadOnSuccess) {
        window.location.reload();
        return;
      }
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

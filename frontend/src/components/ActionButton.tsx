import React, { useCallback, useState } from 'react';

import { Button } from '@kocherga/frontkit';

import { useAPI } from '../common/hooks';

interface Props {
  path: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
  asyncOnSuccess?: () => Promise<void>;
  // Option for quick-and-dirty solutions - don't have to integrate the state change to the existing page.
  // This option has a higher priority than onSuccess.
  reloadOnSuccess?: boolean;
}

const ActionButton = ({
  path,
  children,
  onSuccess,
  asyncOnSuccess,
  reloadOnSuccess,
}: Props) => {
  const api = useAPI();
  const [loading, setLoading] = useState(false);

  const cb = useCallback(async () => {
    setLoading(true);

    await api.call(path, 'POST');
    if (reloadOnSuccess) {
      window.location.reload();
      return;
    }
    if (onSuccess) {
      // It'd be better to pass POST result, but we don't know its type,
      // so we'll need to make ActionButton generic first.
      onSuccess();
    }
    if (asyncOnSuccess) {
      // Sometimes we want to reload some data before we make the button enabled again.
      // asyncOnSuccess allows us to do that.
      await asyncOnSuccess();
    }
    setLoading(false);
  }, [path, api, onSuccess, reloadOnSuccess, asyncOnSuccess]);

  return (
    <Button loading={loading} disabled={loading} onClick={cb}>
      {children}
    </Button>
  );
};

export default ActionButton;

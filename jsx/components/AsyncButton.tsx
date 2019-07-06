import React, { useCallback, useState } from 'react';

import { Button } from '@kocherga/frontkit';

interface Props {
  act: () => Promise<void>;
  children?: React.ReactNode;
}

const AsyncButton = ({ act, children }: Props) => {
  const [loading, setLoading] = useState(false);

  const cb = useCallback(async () => {
    setLoading(true);
    try {
      await act();
    } catch (e) {
      window.alert(e);
    }
    setLoading(false);
  }, [act]);

  return (
    <Button loading={loading} disabled={loading} onClick={cb}>
      {children}
    </Button>
  );
};

export default AsyncButton;

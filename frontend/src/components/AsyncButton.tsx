import React, { useCallback, useState } from 'react';

import { Button } from '@kocherga/frontkit';

interface Props {
  act: () => Promise<void>;
  small?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  kind?: 'primary' | 'danger' | 'default';
}

const AsyncButton = ({ act, children, small, kind, disabled }: Props) => {
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
    <Button
      loading={loading}
      disabled={disabled || loading}
      onClick={cb}
      small={small}
      kind={kind}
    >
      {children}
    </Button>
  );
};

export default AsyncButton;

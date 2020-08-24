import { useCallback, useState } from 'react';

import { Button } from '@kocherga/frontkit';

import { useNotification } from '~/common/hooks';

interface Props {
  act: () => Promise<unknown>;
  small?: boolean; // deprecated
  size?: 'small' | 'normal' | 'big';
  kind?: 'primary' | 'danger' | 'default';
  disabled?: boolean;
  children?: React.ReactNode;
}

const AsyncButton = ({ act, children, small, size, kind, disabled }: Props) => {
  const notify = useNotification();
  const [acting, setActing] = useState(false);

  const cb = useCallback(async () => {
    setActing(true);
    try {
      await act();
    } catch (e) {
      notify({ text: String(e), type: 'Error' });
    }
    setActing(false);
  }, [act, notify]);

  return (
    <Button
      loading={acting}
      disabled={disabled || acting}
      onClick={cb}
      small={small}
      size={size}
      kind={kind}
    >
      {children}
    </Button>
  );
};

export default AsyncButton;

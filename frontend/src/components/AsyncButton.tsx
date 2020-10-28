import { useCallback, useState } from 'react';

import { useNotification } from '~/common/hooks';
import { Button } from '~/frontkit';

interface Props {
  act: () => Promise<unknown>;
  small?: boolean; // deprecated
  size?: Parameters<typeof Button>[0]['size'];
  kind?: Parameters<typeof Button>[0]['kind'];
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
      type="button"
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

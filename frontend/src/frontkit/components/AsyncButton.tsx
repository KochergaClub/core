import { useCallback, useState } from 'react';

import { Button } from '../components/Button';
import { useNotification } from '../global/WithToaster';

export interface Props {
  act: () => Promise<unknown>;
  size?: Parameters<typeof Button>[0]['size'];
  kind?: Parameters<typeof Button>[0]['kind'];
  disabled?: boolean;
  children?: React.ReactNode;
}

export const AsyncButton: React.FC<Props> = ({
  act,
  children,
  size,
  kind,
  disabled,
}: Props) => {
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
      size={size}
      kind={kind}
    >
      {children}
    </Button>
  );
};

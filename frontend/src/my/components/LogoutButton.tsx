import { useCallback, useState } from 'react';

import { useMutation } from '@apollo/client';
import { Button } from '~/frontkit';

import { LogoutDocument } from '../queries.generated';

export default function LogoutButton() {
  const [acting, setActing] = useState(false);

  const [logoutMutation] = useMutation(LogoutDocument);

  const act = useCallback(async () => {
    setActing(true);
    const { data } = await logoutMutation();
    if (!data?.result?.ok) {
      // TODO - show error
      setActing(false);
      return;
    }
    window.location.href = '/';
  }, [logoutMutation]);

  return (
    <Button loading={acting} disabled={acting} onClick={act} small>
      Выйти
    </Button>
  );
}

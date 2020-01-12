import { useState, useCallback } from 'react';

import { Button } from '@kocherga/frontkit';

import { useLogoutMutation } from '../queries.generated';

export default function LogoutButton() {
  const [acting, setActing] = useState(false);

  const [logoutMutation] = useLogoutMutation();

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

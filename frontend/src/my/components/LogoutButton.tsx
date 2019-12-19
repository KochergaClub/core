import React, { useState, useCallback } from 'react';

import { Button } from '@kocherga/frontkit';
import { useAPI } from '../../common/hooks';

export default function LogoutButton() {
  const [acting, setActing] = useState(false);

  const api = useAPI();

  const act = useCallback(async () => {
    setActing(true);
    try {
      await api.call('auth/logout', 'POST');
    } catch (e) {
      setActing(false);
      return;
    }
    window.location.href = '/';
  }, [api]);

  return (
    <Button loading={acting} disabled={acting} onClick={act} small>
      Выйти
    </Button>
  );
}

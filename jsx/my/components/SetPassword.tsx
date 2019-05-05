import React, { useState, useCallback } from 'react';

import { Button, Column, Input } from '@kocherga/frontkit';
import { useAPI } from '../../common/hooks';

export default function SetPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [acting, setActing] = useState(false);

  const api = useAPI();

  const act = useCallback(
    async () => {
      setActing(true);
      await api.call('auth/set-password', 'POST', {
        old_password: oldPassword,
        new_password: newPassword,
      });
      window.location.reload();
      window.alert(
        'Мы разлогинили вас, чтобы вы смогли проверить свой новый пароль.'
      );
    },
    [oldPassword, newPassword]
  );

  return (
    <Column centered>
      <div>
        <label>Старый пароль:</label>
        <Input
          type="password"
          id="old_password"
          value={oldPassword}
          onChange={e => setOldPassword(e.currentTarget.value)}
        />
      </div>
      <div>
        <label>Новый пароль:</label>
        <Input
          type="password"
          id="new_password"
          value={newPassword}
          onChange={e => setNewPassword(e.currentTarget.value)}
        />
      </div>
      <Button loading={acting} disabled={acting} onClick={act}>
        Сменить пароль
      </Button>
    </Column>
  );
}

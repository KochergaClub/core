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
      try {
        await api.call('auth/set-password', 'POST', {
          old_password: oldPassword,
          new_password: newPassword,
        });
      } catch (e) {
        setActing(false);
        return;
      }
      window.location.reload();
      window.alert(
        'Мы разлогинили вас, чтобы вы смогли проверить свой новый пароль.'
      );
    },
    [oldPassword, newPassword]
  );

  return (
    <Column centered>
      <h2>Сменить или установить пароль</h2>
      <Column centered>
        <label>
          Старый пароль (оставьте пустым, если у вас не было пароля):
        </label>
        <Input
          type="password"
          id="old_password"
          value={oldPassword}
          onChange={e => setOldPassword(e.currentTarget.value)}
        />
      </Column>
      <Column centered>
        <label>Новый пароль:</label>
        <Input
          type="password"
          id="new_password"
          value={newPassword}
          onChange={e => setNewPassword(e.currentTarget.value)}
        />
      </Column>
      <Button loading={acting} disabled={acting} onClick={act}>
        Сменить пароль
      </Button>
    </Column>
  );
}

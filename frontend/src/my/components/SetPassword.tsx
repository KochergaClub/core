import { useState, useCallback } from 'react';

import { Button, Column, Label, Input } from '@kocherga/frontkit';
import { useCommonHotkeys, useAPI } from '~/common/hooks';

import HeadedFragment from './HeadedFragment';

const SetPassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [acting, setActing] = useState(false);

  const api = useAPI();

  const act = useCallback(async () => {
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
  }, [api, oldPassword, newPassword]);

  const hotkeys = useCommonHotkeys({
    onEnter: act,
  });

  return (
    <HeadedFragment title="Сменить или установить пароль">
      <Column centered {...hotkeys}>
        <Column centered>
          <Label>Старый пароль (если есть):</Label>
          <Input
            type="password"
            id="old_password"
            value={oldPassword}
            onChange={e => setOldPassword(e.currentTarget.value)}
          />
        </Column>
        <Column centered>
          <Label>Новый пароль:</Label>
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
    </HeadedFragment>
  );
};

export default SetPassword;

import React, { useCallback, useState } from 'react';

import { useCommonHotkeys, useSmartMutation } from '~/common/hooks';
import { HintCard } from '~/components';
import { ErrorMessage } from '~/components/forms';
import { Button, Column, Input, Label } from '~/frontkit';

import { SetPasswordDocument } from '../queries.generated';
import HeadedFragment from './HeadedFragment';

export const PasswordSettings: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [acting, setActing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const setPasswordMutation = useSmartMutation(SetPasswordDocument, {
    expectedTypename: 'SetMyPasswordOkResult',
  });

  const act = useCallback(async () => {
    setActing(true);

    const { ok, error, fieldErrors } = await setPasswordMutation({
      variables: {
        old_password: oldPassword,
        new_password: newPassword,
      },
    });

    if (!ok) {
      setError(
        error ||
          Object.values(fieldErrors || {}).join('. ') ||
          'Неизвестная ошибка'
      );
      setActing(false);
      return;
    }

    window.location.reload();
    window.alert(
      'Мы разлогинили вас, чтобы вы смогли проверить свой новый пароль.'
    );
  }, [setPasswordMutation, oldPassword, newPassword]);

  const hotkeys = useCommonHotkeys({
    onEnter: act,
  });

  return (
    <HeadedFragment title="Сменить или установить пароль">
      <Column gutter={16}>
        <HintCard>
          Если у вас не был настроен пароль, то оставьте поле «Старый пароль»
          пустым.
        </HintCard>
        <Column {...hotkeys} gutter={16}>
          <Column>
            <Label>Старый пароль (если есть):</Label>
            <Input
              type="password"
              id="old_password"
              autoComplete="new-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.currentTarget.value)}
            />
          </Column>
          <Column>
            <Label>Новый пароль:</Label>
            <Input
              type="password"
              id="new_password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.currentTarget.value)}
            />
          </Column>
          <Button
            kind="primary"
            loading={acting}
            disabled={acting}
            onClick={act}
          >
            Сменить пароль
          </Button>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </Column>
      </Column>
    </HeadedFragment>
  );
};

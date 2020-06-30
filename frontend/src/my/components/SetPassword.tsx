import { useState, useCallback } from 'react';

import styled from 'styled-components';

import { Button, Column, Label, Input, colors } from '@kocherga/frontkit';
import { useCommonHotkeys } from '~/common/hooks';
import { HintCard } from '~/components';

import { useSetPasswordMutation } from '../queries.generated';

import HeadedFragment from './HeadedFragment';

// TODO - consolidate with ErrorMessage from ~/components/forms
const ErrorMessage = styled(Label)`
  color: ${colors.accent[500]};
`;

const SetPassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [acting, setActing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [setPasswordMutation] = useSetPasswordMutation();

  const act = useCallback(async () => {
    setActing(true);

    const { data } = await setPasswordMutation({
      variables: {
        old_password: oldPassword,
        new_password: newPassword,
      },
    });

    if (data?.result.error) {
      setError(data.result.error);
      setActing(false);
      return;
    }

    if (!data?.result?.ok) {
      setError('Неизвестная ошибка');
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
      <Column centered {...hotkeys}>
        <HintCard>
          Если у вас не был настроен пароль, то оставьте поле "Старый пароль"
          пустым.
        </HintCard>
        <Column centered>
          <Label>Старый пароль (если есть):</Label>
          <Input
            type="password"
            id="old_password"
            autoComplete="new-password"
            value={oldPassword}
            onChange={e => setOldPassword(e.currentTarget.value)}
          />
        </Column>
        <Column centered>
          <Label>Новый пароль:</Label>
          <Input
            type="password"
            id="new_password"
            autoComplete="new-password"
            value={newPassword}
            onChange={e => setNewPassword(e.currentTarget.value)}
          />
        </Column>
        <Button loading={acting} disabled={acting} onClick={act}>
          Сменить пароль
        </Button>
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </Column>
    </HeadedFragment>
  );
};

export default SetPassword;

import React, { useCallback, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import { useCommonHotkeys, useSmartMutation } from '~/common/hooks';
import { HintCard } from '~/components';
import { ErrorMessage } from '~/components/forms';
import { Button, Column, Input, Label, Row } from '~/frontkit';

import { MySettingsPageFragment, SetMyNamesDocument } from '../queries.generated';
import HeadedFragment from './HeadedFragment';

interface Props {
  user: MySettingsPageFragment['user'];
}

export const SetNames: React.FC<Props> = ({ user }) => {
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');

  const [acting, setActing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const setNamesMutation = useSmartMutation(SetMyNamesDocument, {
    expectedTypename: 'AuthCurrentUser',
  });

  const act = useCallback(async () => {
    setActing(true);

    const { ok, error } = await setNamesMutation({
      variables: {
        input: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (!ok) {
      setError(error || 'Неизвестная ошибка');
      setActing(false);
      return;
    }

    setError(undefined);
    setActing(false);
    setSaved(true);
  }, [setNamesMutation, firstName, lastName]);

  const hotkeys = useCommonHotkeys({
    onEnter: act,
  });

  return (
    <HeadedFragment title="Настроить имя">
      <Column gutter={16}>
        <HintCard>
          По умолчанию мы не покажем ваши имя и фамилию никому, пока вы не
          зайдёте в какое-то онлайн-мероприятие или не поучаствуете в прочих
          социальных активностях на платформе Кочерги.
        </HintCard>
        <Column {...hotkeys} gutter={16}>
          <Column>
            <Label>Имя:</Label>
            <Input
              id="first_name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.currentTarget.value);
                setSaved(false);
              }}
            />
          </Column>
          <Column>
            <Label>Фамилия:</Label>
            <Input
              id="last_name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.currentTarget.value);
                setSaved(false);
              }}
            />
          </Column>
          <div className="flex items-center space-x-2">
            <Button
              kind="primary"
              loading={acting}
              disabled={acting || saved}
              onClick={act}
            >
              <Row vCentered>
                {saved ? <FaCheck /> : null}
                <span>{saved ? 'Сохранено' : 'Сохранить'}</span>
              </Row>
            </Button>
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          </div>
        </Column>
      </Column>
    </HeadedFragment>
  );
};

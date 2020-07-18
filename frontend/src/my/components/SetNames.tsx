import { useState, useCallback } from 'react';

import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

import { Button, Row, Column, Label, Input, colors } from '@kocherga/frontkit';
import { useCommonHotkeys } from '~/common/hooks';
import { HintCard } from '~/components';

import {
  useSetMyNamesMutation,
  MySettingsPageFragment,
} from '../queries.generated';

import HeadedFragment from './HeadedFragment';

// TODO - consolidate with ErrorMessage from ~/components/forms
const ErrorMessage = styled(Label)`
  color: ${colors.accent[500]};
`;

interface Props {
  user: MySettingsPageFragment['user'];
}

const SetNames: React.FC<Props> = ({ user }) => {
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');

  const [acting, setActing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [setNamesMutation] = useSetMyNamesMutation();

  const act = useCallback(async () => {
    setActing(true);

    const { data } = await setNamesMutation({
      variables: {
        first_name: firstName,
        last_name: lastName,
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

    setActing(false);
    setSaved(true);
  }, [setNamesMutation, firstName, lastName]);

  const hotkeys = useCommonHotkeys({
    onEnter: act,
  });

  return (
    <HeadedFragment title="Настроить имя">
      <Column centered gutter={16}>
        <HintCard>
          По умолчанию мы не покажем ваши имя и фамилию никому, пока вы не
          зайдёте в какое-то онлайн-мероприятие или не поучаствуете в прочих
          социальных активностях на платформе Кочерги.
        </HintCard>
        <Column centered {...hotkeys}>
          <Column centered>
            <Label>Имя:</Label>
            <Input
              id="first_name"
              value={firstName}
              onChange={e => {
                setFirstName(e.currentTarget.value);
                setSaved(false);
              }}
            />
          </Column>
          <Column centered>
            <Label>Фамилия:</Label>
            <Input
              id="last_name"
              value={lastName}
              onChange={e => {
                setLastName(e.currentTarget.value);
                setSaved(false);
              }}
            />
          </Column>
          <Button loading={acting} disabled={acting || saved} onClick={act}>
            <Row vCentered>
              {saved ? <FaCheck /> : null}
              <span>{saved ? 'Сохранено' : 'Сохранить'}</span>
            </Row>
          </Button>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </Column>
      </Column>
    </HeadedFragment>
  );
};

export default SetNames;

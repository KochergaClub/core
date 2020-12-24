import { useCallback, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { useCommonHotkeys } from '~/common/hooks';
import { HintCard } from '~/components';
import { Button, colors, Column, Input, Label, Row } from '~/frontkit';

import { MySettingsPageFragment, SetMyNamesDocument } from '../queries.generated';
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

  const [setNamesMutation] = useMutation(SetMyNamesDocument);

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
        </Column>
      </Column>
    </HeadedFragment>
  );
};

export default SetNames;

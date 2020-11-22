import 'react-toggle/style.css';

import { useCallback, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Toggle from 'react-toggle';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { HintCard } from '~/components';
import { AsyncButton, Badge, Column, Row } from '~/frontkit';

import {
    EmailSubscriptionFragment, EmailSubscriptionInterestFragment, MyEmailResubscribeDocument,
    MyEmailSubscribeToInterestDocument, MyEmailUnsubscribeDocument,
    MyEmailUnsubscribeFromInterestDocument
} from '../queries.generated';
import HeadedFragment from './HeadedFragment';

interface InterestProps {
  interest: EmailSubscriptionInterestFragment;
}

// FIXME - mostly copy-pasted from ~/components/Spinner, can't use BasicSpinner because it's grey
export const SpinnerForToggle = styled(FaSpinner)`
  animation: icon-spin 2s infinite linear;

  @keyframes icon-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

const InterestCheckbox: React.FC<InterestProps> = ({ interest }) => {
  const [subscribeMutation] = useMutation(MyEmailSubscribeToInterestDocument, {
    refetchQueries: ['MySettingsPage'],
    awaitRefetchQueries: true,
  });
  const [unsubscribeMutation] = useMutation(
    MyEmailUnsubscribeFromInterestDocument,
    {
      refetchQueries: ['MySettingsPage'],
      awaitRefetchQueries: true,
    }
  );
  const [acting, setActing] = useState(false);

  const act = useCallback(async () => {
    setActing(true);
    const mutation = interest.subscribed
      ? unsubscribeMutation
      : subscribeMutation;
    await mutation({
      variables: {
        interest_id: interest.id,
      },
    });
    setActing(false);
  }, [
    interest.subscribed,
    interest.id,
    subscribeMutation,
    unsubscribeMutation,
  ]);

  return (
    <Row spaced>
      <div>{interest.name}</div>
      <Toggle
        checked={interest.subscribed || false}
        onChange={act}
        icons={
          acting
            ? {
                checked: <SpinnerForToggle size={12} color="white" />,
                unchecked: <SpinnerForToggle size={12} color="white" />,
              }
            : undefined
        }
      />
    </Row>
  );
};

interface InterestListProps {
  interests: EmailSubscriptionInterestFragment[];
}

const InterestList: React.FC<InterestListProps> = ({ interests }) => {
  return (
    <Column>
      {interests.map((interest) => (
        <InterestCheckbox key={interest.id} interest={interest} />
      ))}
    </Column>
  );
};

interface Props {
  email_subscription: EmailSubscriptionFragment;
}

const EmailSettings: React.FC<Props> = ({ email_subscription }) => {
  const [resubscribeCb] = useMutation(MyEmailResubscribeDocument, {
    refetchQueries: ['MySettingsPage'],
    awaitRefetchQueries: true,
  });
  const [unsubscribeCb] = useMutation(MyEmailUnsubscribeDocument, {
    refetchQueries: ['MySettingsPage'],
    awaitRefetchQueries: true,
  });

  return (
    <HeadedFragment title="Рассылки">
      <Column centered gutter={20}>
        {(() => {
          switch (email_subscription.status) {
            case 'unsubscribed':
              return (
                <>
                  <div>Вы отписаны от всех рассылок Кочерги.</div>
                  <AsyncButton
                    kind="primary"
                    act={async () => {
                      await resubscribeCb();
                    }}
                  >
                    Подписаться
                  </AsyncButton>
                </>
              );
            case 'pending':
              return (
                <HintCard>
                  Вы отписаны от всех отсылок Кочерги, но передумали и запросили
                  переподписку. Чтобы подтвердить эту операцию, найдите входящее
                  письмо с запросом подтверждения переподписки и нажмите кнопку
                  в нём.
                </HintCard>
              );
            case 'subscribed':
              return (
                <Column centered gutter={20}>
                  {email_subscription.interests ? (
                    <InterestList interests={email_subscription.interests} />
                  ) : null}
                  <AsyncButton
                    kind="primary"
                    act={async () => {
                      await unsubscribeCb();
                    }}
                  >
                    Отписаться от всех писем
                  </AsyncButton>
                </Column>
              );
            default:
              return (
                <Badge>Неизвестный статус: {email_subscription.status}</Badge>
              );
          }
        })()}
      </Column>
    </HeadedFragment>
  );
};

export default EmailSettings;

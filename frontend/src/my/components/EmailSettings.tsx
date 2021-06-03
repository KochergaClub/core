import { useCallback, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { useMutation } from '@apollo/client';

import { HintCard } from '~/components';
import { AsyncButton, Badge, Column, Row, Toggle } from '~/frontkit';

import {
    EmailSubscriptionFragment, EmailSubscriptionInterestFragment, MyEmailResubscribeDocument,
    MyEmailSubscribeToInterestDocument, MyEmailUnsubscribeDocument,
    MyEmailUnsubscribeFromInterestDocument
} from '../queries.generated';
import HeadedFragment from './HeadedFragment';

interface InterestProps {
  interest: EmailSubscriptionInterestFragment;
}

export const SpinnerForToggle: React.FC = () => (
  <FaSpinner className="animate-spin-slow text-white" size={12} />
);

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
    <Row spaced gutter={8}>
      <div>{interest.name}</div>
      <Toggle
        checked={interest.subscribed || false}
        onChange={act}
        icons={
          acting
            ? {
                checked: <SpinnerForToggle />,
                unchecked: <SpinnerForToggle />,
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
    <div className="space-y-1">
      {interests.map((interest) => (
        <InterestCheckbox key={interest.id} interest={interest} />
      ))}
    </div>
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
      {(() => {
        switch (email_subscription.status) {
          case 'unsubscribed':
            return (
              <Column gutter={20}>
                <div>Вы отписаны от всех рассылок Кочерги.</div>
                <AsyncButton
                  kind="primary"
                  act={async () => {
                    await resubscribeCb();
                  }}
                >
                  Подписаться
                </AsyncButton>
              </Column>
            );
          case 'pending':
            return (
              <HintCard>
                Вы отписаны от всех отсылок Кочерги, но передумали и запросили
                переподписку. Чтобы подтвердить эту операцию, найдите входящее
                письмо с запросом подтверждения переподписки и нажмите кнопку в
                нём.
              </HintCard>
            );
          case 'subscribed':
            return (
              <Column gutter={20}>
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
    </HeadedFragment>
  );
};

export default EmailSettings;

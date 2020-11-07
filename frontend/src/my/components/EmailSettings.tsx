import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

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

  const act = useCallback(async () => {
    const mutation = interest.subscribed
      ? unsubscribeMutation
      : subscribeMutation;
    await mutation({
      variables: {
        interest_id: interest.id,
      },
    });
  }, [
    interest.subscribed,
    interest.id,
    subscribeMutation,
    unsubscribeMutation,
  ]);

  return (
    <Row spaced>
      <div>{interest.name}</div>
      <AsyncButton act={act} small>
        {interest.subscribed ? 'subscribed' : 'unsubscribed'}
      </AsyncButton>
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
      <Column centered>
        <Badge>{email_subscription.status}</Badge>
        {email_subscription.status === 'unsubscribed' && (
          <AsyncButton
            act={async () => {
              await resubscribeCb();
            }}
          >
            Подписаться заново
          </AsyncButton>
        )}
        {email_subscription.status === 'subscribed' && (
          <Column centered gutter={20}>
            {email_subscription.interests ? (
              <InterestList interests={email_subscription.interests} />
            ) : null}
            <AsyncButton
              act={async () => {
                await unsubscribeCb();
              }}
            >
              Отписаться от всех писем
            </AsyncButton>
          </Column>
        )}
      </Column>
    </HeadedFragment>
  );
};

export default EmailSettings;

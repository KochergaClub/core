import React, { useCallback, useState, useEffect } from 'react';

import { Row, Column } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';
import AsyncButton from '~/components/AsyncButton';
import Badge from '~/components/Badge';

import {
  getEmailSubscriptionStatus,
  callEmailAction,
  updateInterests,
} from '../api';
import { MySubscriptionStatus, MailchimpMemberInterest } from '../types';

import HeadedFragment from './HeadedFragment';

type SetInterestStatusCb = (id: string, status: boolean) => Promise<void>;

interface InterestProps {
  interest: MailchimpMemberInterest;
  setInterestStatus: SetInterestStatusCb;
}

const InterestCheckbox: React.FC<InterestProps> = ({
  interest,
  setInterestStatus,
}) => {
  return (
    <Row spaced>
      <div>{interest.name}</div>
      <AsyncButton
        act={async () =>
          await setInterestStatus(interest.id, !interest.subscribed)
        }
        small
      >
        {interest.subscribed ? 'subscribed' : 'unsubscribed'}
      </AsyncButton>
    </Row>
  );
};

interface InterestListProps {
  interests: MailchimpMemberInterest[];
  setInterestStatus: SetInterestStatusCb;
}

const InterestList: React.FC<InterestListProps> = ({
  interests,
  setInterestStatus,
}) => {
  return (
    <Column>
      {interests.map(interest => (
        <InterestCheckbox
          key={interest.id}
          interest={interest}
          setInterestStatus={setInterestStatus}
        />
      ))}
    </Column>
  );
};

const EmailSettings: React.FC<{}> = () => {
  const [status, setStatus] = useState<MySubscriptionStatus | undefined>(
    undefined
  );

  const api = useAPI();

  const fetchStatus = useCallback(async () => {
    setStatus(await getEmailSubscriptionStatus(api));
  }, [api]);

  useEffect(() => {
    fetchStatus();
  }, []);

  const resubscribeCb = useCallback(async () => {
    await callEmailAction(api, 'resubscribe');
    await fetchStatus();
  }, [api, fetchStatus]);

  const unsubscribeCb = useCallback(async () => {
    await callEmailAction(api, 'unsubscribe');
    await fetchStatus();
  }, [api]);

  const setInterestStatus = useCallback(
    async (id: string, newStatus: boolean) => {
      console.log(`setting interest status for ${id} -> ${newStatus}`);
      const interestIds: string[] = [];

      if (!status || status.status === 'none') {
        return;
      }

      status.interests.forEach(interest => {
        if (interest.id === id) {
          if (newStatus) {
            interestIds.push(interest.id);
          }
        } else {
          if (interest.subscribed) {
            interestIds.push(interest.id);
          }
        }
      });
      console.log(interestIds);

      await updateInterests(api, interestIds);
      await fetchStatus();
    },
    [api, status]
  );

  if (status === undefined) {
    return null; // TODO - spinner
  }
  return (
    <HeadedFragment title="Статус подписки">
      <Column centered>
        <Badge>{status.status}</Badge>
        {status.status === 'unsubscribed' && (
          <AsyncButton act={resubscribeCb}>Подписаться заново</AsyncButton>
        )}
        {status.status === 'subscribed' && (
          <Column centered gutter={20}>
            <InterestList
              interests={status.interests}
              setInterestStatus={setInterestStatus}
            />
            <AsyncButton act={unsubscribeCb}>
              Отписаться от всех писем
            </AsyncButton>
          </Column>
        )}
      </Column>
    </HeadedFragment>
  );
};

export default EmailSettings;

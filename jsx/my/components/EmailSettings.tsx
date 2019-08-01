import React, { useCallback, useState, useEffect } from 'react';

import { Column } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';
import AsyncButton from '~/components/AsyncButton';

import { getEmailSubscriptionStatus, callEmailAction } from '../api';

import HeadedFragment from './HeadedFragment';

const EmailSettings: React.FC<{}> = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);

  const api = useAPI();

  const fetchStatus = useCallback(async () => {
    setStatus(await getEmailSubscriptionStatus(api));
  }, [api]);

  useEffect(() => {
    fetchStatus();
  });

  const resubscribeCb = useCallback(async () => {
    await callEmailAction(api, 'resubscribe');
    await fetchStatus();
  }, [api, fetchStatus]);

  const unsubscribeCb = useCallback(async () => {
    await callEmailAction(api, 'unsubscribe');
    await fetchStatus();
  }, [api]);

  if (status === undefined) {
    return null; // TODO - spinner
  } else {
    return (
      <HeadedFragment title="Статус подписки">
        <Column centered>
          <div>{status}</div>
          {status === 'unsubscribed' && (
            <AsyncButton act={resubscribeCb}>Подписаться заново</AsyncButton>
          )}
          {status === 'subscribed' && (
            <AsyncButton act={unsubscribeCb}>
              Отписаться от всех писем
            </AsyncButton>
          )}
        </Column>
      </HeadedFragment>
    );
  }
};

export default EmailSettings;

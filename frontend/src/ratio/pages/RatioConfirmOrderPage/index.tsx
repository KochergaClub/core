import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useMutation } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import { RatioConfirmOrderOutcome } from '~/apollo/types.generated';
import { Page, Spinner } from '~/components';

import { RatioConfirmOrderDocument } from './queries.generated';

const ConfirmOutcome: React.FC<{ outcome: RatioConfirmOrderOutcome }> = ({
  outcome,
}) => {
  return <div>{outcome}</div>;
};

const RatioConfirmOrderPage: NextApolloPage = () => {
  const router = useRouter();
  const orderId = router.query?.id as string;

  const [confirmMutation, confirmResults] = useMutation(
    RatioConfirmOrderDocument
  );

  useEffect(() => {
    (async () => {
      await confirmMutation({
        variables: {
          id: orderId,
        },
      });
    })();
  }, [confirmMutation, orderId]);

  return (
    <Page title="Подтверждение заказа">
      <Page.Title>TODO</Page.Title>
      <Page.Main>
        {confirmResults.loading ? (
          <Spinner size="block" />
        ) : confirmResults.data ? (
          <ConfirmOutcome outcome={confirmResults.data.result.outcome} />
        ) : (
          <div>Ошибка: {confirmResults.error}</div>
        )}
      </Page.Main>
    </Page>
  );
};

export default withApollo(RatioConfirmOrderPage);

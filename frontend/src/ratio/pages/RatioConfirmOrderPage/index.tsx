import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useMutation } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import { Page, Spinner } from '~/components';

import ConfirmOutcome from './ConfirmOutcome';
import { RatioConfirmOrderDocument } from './queries.generated';

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
      <Page.Title>Подтверждение заказа</Page.Title>
      <Page.Main>
        {!confirmResults.called || confirmResults.loading ? (
          <Spinner size="block" />
        ) : confirmResults.data ? (
          <ConfirmOutcome outcome={confirmResults.data.result.outcome} />
        ) : (
          <ConfirmOutcome outcome="graphql-error" />
        )}
      </Page.Main>
    </Page>
  );
};

export default withApollo(RatioConfirmOrderPage);

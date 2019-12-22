import { NextPage } from '~/common/types';
import { withApollo } from '~/apollo/client';

import { Page } from '~/components';

import PaymentCollection from '~/cashier/components/PaymentCollection';

const CashierPage: NextPage = () => {
  return (
    <Page title="Касса" team>
      <Page.Title>Касса</Page.Title>
      <Page.Main>
        <PaymentCollection />
      </Page.Main>
    </Page>
  );
};

export default withApollo(CashierPage);

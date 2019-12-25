import { NextApolloPage } from '~/apollo/types';
import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import { Page } from '~/components';

import PaymentCollection from '~/cashier/components/PaymentCollection';

const CashierPage: NextApolloPage = () => {
  return (
    <Page title="Касса" team>
      <Page.Title>Касса</Page.Title>
      <Page.Main>
        <PaymentCollection />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(CashierPage));

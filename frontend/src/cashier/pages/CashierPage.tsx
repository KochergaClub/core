import { NextApolloPage, withApollo, withStaff } from '~/apollo';

import { Page } from '~/components';

import PaymentCollection from '~/cashier/components/PaymentCollection';

const CashierPage: NextApolloPage = () => {
  return (
    <Page title="Касса" menu="team">
      <Page.Title>Касса</Page.Title>
      <Page.Main>
        <PaymentCollection />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(CashierPage));

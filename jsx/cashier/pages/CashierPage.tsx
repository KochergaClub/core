import React from 'react';

import { loadMembers } from '~/staff/actions';
import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadPayments } from '~/cashier/actions';

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

CashierPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadPayments());
  await dispatch(loadMembers());
  return {};
};

export default CashierPage;

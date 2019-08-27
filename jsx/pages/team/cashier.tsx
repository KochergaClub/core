import React from 'react';

import { Column } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadPayments } from '~/cashier/actions';

import CreatePayment from '~/cashier/components/CreatePayment';
import PaymentList from '~/cashier/components/PaymentList';

const CashierPage: NextPage = () => {
  return (
    <Page title="Касса" team>
      <Page.Title>Касса</Page.Title>
      <Page.Main>
        <h2>Выплаты</h2>
        <Column stretch>
          <PaymentList />
          <div>
            <CreatePayment />
          </div>
        </Column>
      </Page.Main>
    </Page>
  );
};

CashierPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadPayments());
  return {};
};

export default CashierPage;

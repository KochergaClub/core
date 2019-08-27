import React from 'react';

import { Column } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { Payment } from '~/cashier/types';
import { getPayments } from '~/cashier/api';

import CreatePayment from '~/cashier/components/CreatePayment';
import PaymentList from '~/cashier/components/PaymentList';

interface Props {
  payments: Payment[];
}

const CashierPage: NextPage<Props> = ({ payments }) => {
  return (
    <Page title="Касса" team>
      <Page.Title>Касса</Page.Title>
      <Page.Main>
        <h2>Выплаты</h2>
        <Column stretch>
          <PaymentList payments={payments} />
          <div>
            <CreatePayment />
          </div>
        </Column>
      </Page.Main>
    </Page>
  );
};

CashierPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());
  const payments = await getPayments(api);
  return { payments };
};

export default CashierPage;

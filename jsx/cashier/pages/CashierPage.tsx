import React from 'react';

import { Row, Column } from '@kocherga/frontkit';

import { loadMembers } from '~/staff/actions';
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
        <h2>
          <Row vCentered>
            <div>Выплаты</div>
            <CreatePayment />
          </Row>
        </h2>
        <Column stretch>
          <PaymentList />
        </Column>
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

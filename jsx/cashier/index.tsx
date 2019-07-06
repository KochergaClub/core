import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';
import ActionButton from '../components/ActionButton';
import AsyncButton from '../components/AsyncButton';
import { useAPI, usePermissions } from '../common/hooks';

import { Payment } from './types';
import { getPayments } from './api';

interface Props {
  payments: Payment[];
}

const CreatePayment = () => {
  const api = useAPI();
  const [canCreate] = usePermissions(['cashier.create']);

  const createTestPayment = async () => {
    await api.call('cashier/payment', 'POST', {
      amount: 5000,
      comment: 'test comment',
      whom: 'me@berekuk.ru',
    });
  };

  if (!canCreate) {
    return null;
  }

  return (
    <AsyncButton act={createTestPayment}>Создать тестовую выплату</AsyncButton>
  ); // TODO - implement real payments
};

const PaymentItem = ({ payment }: { payment: Payment }) => {
  const [canRedeem] = usePermissions(['cashier.redeem']);

  return (
    <div>
      {payment.amount} руб. &rarr; {payment.whom}
      {canRedeem
        ? payment.is_redeemed || (
            <ActionButton
              path={`cashier/payment/${payment.id}/redeem`}
              reloadOnSuccess
            >
              Выплачено
            </ActionButton>
          )
        : null}
    </div>
  );
};

const CashierPage = ({ payments }: Props) => {
  return (
    <Page title="Касса" team>
      <Page.Title>Касса</Page.Title>
      <Page.Main>
        <h2>Выплаты</h2>
        <ul>
          {payments.map(payment => (
            <li key={payment.id}>
              <PaymentItem payment={payment} />
            </li>
          ))}
        </ul>
        <CreatePayment />
      </Page.Main>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async context => {
  const payments = await getPayments(context.api);
  return { payments };
};

const screen: Screen<Props> = {
  component: CashierPage,
  getInitialData,
};
export default screen;

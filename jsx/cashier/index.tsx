import React from 'react';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import ActionButton from '~/components/ActionButton';
import { usePermissions } from '~/common/hooks';
import { selectAPI } from '~/core/selectors';

import { Payment } from './types';
import { getPayments } from './api';
import CreatePayment from './components/CreatePayment';

interface Props {
  payments: Payment[];
}

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

const getInitialData: InitialLoader<Props> = async ({ getState }) => {
  const api = selectAPI(getState());
  const payments = await getPayments(api);
  return { payments };
};

const screen: Screen<Props> = {
  component: CashierPage,
  getInitialData,
};
export default screen;

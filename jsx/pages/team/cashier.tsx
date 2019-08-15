import React from 'react';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import ActionButton from '~/components/ActionButton';
import { usePermissions } from '~/common/hooks';
import { selectAPI } from '~/core/selectors';

import { Payment } from '~/cashier/types';
import { getPayments } from '~/cashier/api';
import CreatePayment from '~/cashier/components/CreatePayment';

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

const CashierPage: NextPage<Props> = ({ payments }) => {
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

CashierPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());
  const payments = await getPayments(api);
  return { payments };
};

export default CashierPage;

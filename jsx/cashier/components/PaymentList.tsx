import React from 'react';

import { usePermissions } from '~/common/hooks';

import ActionButton from '~/components/ActionButton';
import Card, { CardList } from '~/components/Card';

import { Payment } from '../types';

interface Props {
  payments: Payment[];
}

const PaymentItem = ({ payment }: { payment: Payment }) => {
  const [canRedeem] = usePermissions(['cashier.redeem']);

  return (
    <Card>
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
    </Card>
  );
};

const PaymentList: React.FC<Props> = ({ payments }) => {
  return (
    <CardList>
      {payments.map(payment => (
        <PaymentItem payment={payment} key={payment.id} />
      ))}
    </CardList>
  );
};

export default PaymentList;

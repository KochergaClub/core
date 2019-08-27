import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { usePermissions } from '~/common/hooks';

import ActionButton from '~/components/ActionButton';
import Card, { CardList } from '~/components/Card';

import { Payment } from '../types';
import { loadPayments } from '../actions';
import { selectPayments } from '../selectors';

const PaymentItem = ({ payment }: { payment: Payment }) => {
  const [canRedeem] = usePermissions(['cashier.redeem']);

  const dispatch = useDispatch();

  const reload = useCallback(async () => {
    await dispatch(loadPayments());
  }, [dispatch]);

  return (
    <Card>
      {payment.amount} руб. &rarr; {payment.whom}
      {canRedeem
        ? payment.is_redeemed || (
            <ActionButton
              path={`cashier/payment/${payment.id}/redeem`}
              asyncOnSuccess={reload}
            >
              Выплачено
            </ActionButton>
          )
        : null}
    </Card>
  );
};

const PaymentList: React.FC = () => {
  const payments = useSelector(selectPayments);

  return (
    <CardList>
      {payments.map(payment => (
        <PaymentItem payment={payment} key={payment.id} />
      ))}
    </CardList>
  );
};

export default PaymentList;

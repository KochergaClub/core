import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { usePermissions, useDispatch } from '~/common/hooks';

import { Collection, CustomCardListView } from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import { addPayment, selectPayments } from '../features/payment';
import { Payment, CreatePaymentParams } from '../types';

import PaymentCard from './PaymentCard';

const paymentShape: FormShape = [
  { name: 'amount', type: 'number' },
  { name: 'comment', type: 'string' },
  { name: 'whom_id', type: 'number' },
];

const PaymentCollection: React.FC = () => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const [canCreate] = usePermissions(['cashier.create']);

  const isMuted = (payment: Payment) => payment.is_redeemed;

  const renderItem = useCallback(
    (payment: Payment) => <PaymentCard payment={payment} />,
    []
  );

  const add = useCallback(
    async (values: CreatePaymentParams) => {
      await dispatch(addPayment(values));
    },
    [dispatch, addPayment]
  );

  return (
    <Collection
      names={{
        plural: 'выплаты',
        genitive: 'выплату',
      }}
      items={payments}
      add={canCreate ? { cb: add, shape: paymentShape } : undefined}
      view={props => (
        <CustomCardListView
          {...props}
          isMuted={isMuted}
          renderItem={renderItem}
        />
      )}
    />
  );
};

export default PaymentCollection;

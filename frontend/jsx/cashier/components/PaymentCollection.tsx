import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { usePermissions, useDispatch, useAPI } from '~/common/hooks';

import { Collection, CustomCardListView } from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import { Member } from '~/staff/types';

import { addPayment, selectPayments } from '../features/payment';
import { Payment, CreatePaymentParams } from '../types';

import PaymentCard from './PaymentCard';

const PaymentCollection: React.FC = () => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const [canCreate] = usePermissions(['cashier.create']);

  const api = useAPI();

  const isMuted = (payment: Payment) => payment.is_redeemed;

  const paymentShape: FormShape = [
    { name: 'amount', type: 'number' },
    { name: 'comment', type: 'string' },
    {
      name: 'whom_id',
      type: 'fk',
      widget: {
        type: 'async',
        load: async () => (await api.call('staff/member', 'GET')) as Member[],
        display: (member: Member) => member.full_name,
        getValue: (member: Member) => member.user_id,
      },
    },
  ];

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

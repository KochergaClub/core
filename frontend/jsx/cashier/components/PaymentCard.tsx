import { useCallback } from 'react';

import { formatDate } from '~/common/utils';

import { Row, Label } from '@kocherga/frontkit';

import { useAPI, usePermissions, useDispatch } from '~/common/hooks';

import AsyncButtonWithConfirm from '~/components/AsyncButtonWithConfirm';

import UserInfo from '~/audit/components/UserInfo';

import { Payment } from '../types';
import { loadPayments } from '../features/payment';

const PaymentCard = ({ payment }: { payment: Payment }) => {
  const [canRedeem] = usePermissions(['cashier.redeem']);

  const dispatch = useDispatch();
  const api = useAPI();

  const redeem = useCallback(async () => {
    await api.call(`cashier/payment/${payment.id}/redeem`, 'POST');
    await dispatch(loadPayments());
  }, [api, payment.id, dispatch]);

  return (
    <div>
      <Row>
        <strong>{payment.amount} руб. &rarr; </strong>
        <UserInfo user={payment.whom} />
      </Row>
      {payment.comment ? <div>{payment.comment}</div> : null}
      <Row vCentered>
        <Label>Создано:</Label>
        <div>{formatDate(new Date(payment.created_dt), 'd MMMM yyyy')}</div>
      </Row>
      {payment.redeem_dt && (
        <Row vCentered>
          <Label>Выплачено:</Label>
          <div>{formatDate(new Date(payment.redeem_dt), 'd MMMM yyyy')}</div>
        </Row>
      )}
      {canRedeem && !payment.is_redeemed ? (
        <AsyncButtonWithConfirm
          act={redeem}
          confirmText="Наличные деньги выплачены из кассы и вы внесли запись в таблицу расходов?"
        >
          Выплачено
        </AsyncButtonWithConfirm>
      ) : null}
    </div>
  );
};

export default PaymentCard;

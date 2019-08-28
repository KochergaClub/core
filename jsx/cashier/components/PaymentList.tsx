import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { formatDate } from '~/common/utils';

import { Row, Label } from '@kocherga/frontkit';

import { useAPI, usePermissions } from '~/common/hooks';

import AsyncButtonWithConfirm from '~/components/AsyncButtonWithConfirm';
import Card, { CardList } from '~/components/Card';
import MutedCard from '~/components/MutedCard';

import { Payment } from '../types';
import { loadPayments } from '../actions';
import { selectPayments } from '../selectors';

const PaymentItem = ({ payment }: { payment: Payment }) => {
  const [canRedeem] = usePermissions(['cashier.redeem']);

  const dispatch = useDispatch();
  const api = useAPI();

  const redeem = useCallback(async () => {
    await api.call(`cashier/payment/${payment.id}/redeem`, 'POST');
    await dispatch(loadPayments());
  }, [api, payment.id, dispatch]);

  const Wrapper = payment.is_redeemed ? MutedCard : Card;

  return (
    <Wrapper>
      <div>
        <strong>
          {payment.amount} руб. &rarr; {payment.whom}
        </strong>
      </div>
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
    </Wrapper>
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

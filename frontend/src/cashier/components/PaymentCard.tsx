import { useCallback } from 'react';

import { formatDate } from '~/common/utils';

import { Row, Label } from '@kocherga/frontkit';

import { usePermissions } from '~/common/hooks';

import { AsyncButtonWithConfirm } from '~/components';

import UserInfo from '~/audit/components/UserInfo';

import { PaymentFragment, useCashierRedeemPaymentMutation } from '../codegen';

const PaymentCard = ({ payment }: { payment: PaymentFragment }) => {
  const [canRedeem] = usePermissions(['cashier.redeem']);

  const [redeemMutation] = useCashierRedeemPaymentMutation({
    refetchQueries: ['CashierPayments'],
    awaitRefetchQueries: true,
  });

  const redeem = useCallback(async () => {
    await redeemMutation({ variables: { id: payment.id } });
  }, [payment.id, redeemMutation]);

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

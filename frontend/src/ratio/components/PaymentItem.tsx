import { useCallback } from 'react';

import { FaCheck, FaTimes, FaCashRegister } from 'react-icons/fa';

import { colors, Row } from '@kocherga/frontkit';

import { Badge } from '~/components';
import { usePermissions } from '~/common/hooks';

import {
  useRatioPaymentFiscalizeMutation,
  RatioPaymentFragment,
  useRatioPaymentSetStatusMutation,
  useRatioPaymentFiscalizedManuallyMutation,
  useRatioPaymentDeleteMutation,
} from '../queries.generated';
import DropdownMenu, { Action } from '~/components/DropdownMenu';

interface Props {
  payment: RatioPaymentFragment;
}

const CanceledBadge = () => <Badge>ОТКАЗ</Badge>;

const FiscalizeAction: React.FC<Props> = ({ payment }) => {
  const [isKkmUser] = usePermissions(['cashier.kkm_user']);
  const [fiscalizeMutation] = useRatioPaymentFiscalizeMutation({
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const click = useCallback(async () => {
    await fiscalizeMutation({
      variables: {
        payment_id: payment.id,
      },
    });
  }, [payment.id, fiscalizeMutation]);

  if (!isKkmUser) {
    return null;
  }
  if (payment.status !== 'paid') {
    return null;
  }
  if (payment.fiscalization_status !== 'todo') {
    return null;
  }

  return <Action act={click}>Напечатать чек</Action>;
};

const DeleteAction: React.FC<Props> = ({ payment }) => {
  const [mutation] = useRatioPaymentDeleteMutation({
    variables: {
      payment_id: payment.id,
    },
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  return (
    <Action
      act={async () => {
        await mutation();
      }}
    >
      Удалить
    </Action>
  );
};

const FiscalizedManuallyAction: React.FC<Props> = ({ payment }) => {
  const [mutation] = useRatioPaymentFiscalizedManuallyMutation({
    variables: {
      payment_id: payment.id,
    },
  });

  if (payment.status !== 'paid') {
    return null;
  }
  if (
    payment.fiscalization_status !== 'todo' &&
    payment.fiscalization_status !== 'in_progress'
  ) {
    return null;
  }
  return <Action act={mutation}>Чек пробит вручную</Action>;
};

const PaymentStatus: React.FC<Props> = ({ payment }) => {
  switch (payment.status) {
    case 'canceled':
      return <CanceledBadge />;
    case 'todo':
      return <FaTimes color={colors.accent[700]} />;
    case 'paid':
      return <FaCheck />;
    default:
      return <Badge>НЕИЗВЕСТНЫЙ СТАТУС</Badge>;
  }
};

const FiscalizationStatus: React.FC<Props> = ({ payment }) => {
  if (payment.status !== 'paid') {
    return null;
  }
  switch (payment.fiscalization_status) {
    case 'todo':
      return <Badge>Нужно пробить чек</Badge>;
    case 'in_progress':
      return <Badge>Пробивка чека сломалась</Badge>;
    case 'not_needed':
      return null;
    case 'fiscalized':
      return <FaCashRegister />;
    default:
      return <Badge>НЕИЗВЕСТНЫЙ СТАТУС ФИСКАЛИЗАЦИИ</Badge>;
  }
};

const SetStatusAction: React.FC<{
  payment: RatioPaymentFragment;
  status: string;
}> = ({ payment, status, children }) => {
  const [setStatusMutation] = useRatioPaymentSetStatusMutation();

  const act = useCallback(async () => {
    await setStatusMutation({
      variables: {
        input: {
          payment_id: payment.id,
          status,
        },
      },
    });
  }, [payment.id, status, setStatusMutation]);

  return <Action act={act}>{children}</Action>;
};

const StatusActions: React.FC<Props> = ({ payment }) => {
  return (
    <>
      {payment.status === 'todo' && (
        <SetStatusAction payment={payment} status="paid">
          Оплачен
        </SetStatusAction>
      )}
      {payment.status === 'paid' && (
        <SetStatusAction payment={payment} status="todo">
          Не оплачен
        </SetStatusAction>
      )}
    </>
  );
};

const PaymentItem: React.FC<Props> = ({ payment }) => {
  return (
    <Row vCentered>
      <PaymentStatus payment={payment} />
      <div>{payment.amount} руб.</div>
      <FiscalizationStatus payment={payment} />
      <DropdownMenu placement="bottom-start">
        <StatusActions payment={payment} />
        <FiscalizeAction payment={payment} />
        <FiscalizedManuallyAction payment={payment} />
        <DeleteAction payment={payment} />
      </DropdownMenu>
    </Row>
  );
};

export default PaymentItem;

import { useCallback } from 'react';
import { FaCashRegister, FaCheck, FaTimes } from 'react-icons/fa';

import { useMutation } from '@apollo/client';
import { colors, Row } from '~/frontkit';

import { usePermissions } from '~/common/hooks';
import { Badge } from '~/components';
import DropdownMenu, { Action } from '~/components/DropdownMenu';

import {
    RatioPaymentDeleteDocument, RatioPaymentFiscalizedManuallyDocument,
    RatioPaymentFiscalizeDocument, RatioPaymentFragment, RatioPaymentSetStatusDocument
} from '../queries.generated';

interface Props {
  payment: RatioPaymentFragment;
}

const CanceledBadge = () => <Badge type="accent">ОТКАЗ</Badge>;

const FiscalizeAction: React.FC<Props> = ({ payment }) => {
  const [isKkmUser] = usePermissions(['cashier.kkm_user']);
  const [fiscalizeMutation] = useMutation(RatioPaymentFiscalizeDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const act = useCallback(async () => {
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

  return <Action act={act}>Напечатать чек</Action>;
};

const DeleteAction: React.FC<Props> = ({ payment }) => {
  const [mutation] = useMutation(RatioPaymentDeleteDocument, {
    variables: {
      payment_id: payment.id,
    },
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const act = useCallback(async () => {
    await mutation();
  }, [mutation]);

  return <Action act={act}>Удалить</Action>;
};

const FiscalizedManuallyAction: React.FC<Props> = ({ payment }) => {
  const [mutation] = useMutation(RatioPaymentFiscalizedManuallyDocument, {
    variables: {
      payment_id: payment.id,
    },
  });

  const act = useCallback(async () => {
    await mutation();
  }, [mutation]);

  if (payment.status !== 'paid') {
    return null;
  }
  if (
    payment.fiscalization_status !== 'todo' &&
    payment.fiscalization_status !== 'in_progress'
  ) {
    return null;
  }
  return <Action act={act}>Чек пробит вручную</Action>;
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
      return <Badge type="accent">Нужно пробить чек</Badge>;
    case 'in_progress':
      return <Badge type="accent">Пробивка чека сломалась</Badge>;
    case 'not_needed':
      return null;
    case 'fiscalized':
      return <FaCashRegister />;
    default:
      return <Badge type="accent">НЕИЗВЕСТНЫЙ СТАТУС ФИСКАЛИЗАЦИИ</Badge>;
  }
};

const SetStatusAction: React.FC<{
  payment: RatioPaymentFragment;
  status: string;
}> = ({ payment, status, children }) => {
  const [setStatusMutation] = useMutation(RatioPaymentSetStatusDocument);

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

import React from 'react';
import { FaCashRegister, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

import { usePermissions } from '~/common/hooks';
import DropdownMenu, { MutationAction } from '~/components/DropdownMenu';
import { Badge, colors, Row } from '~/frontkit';

import {
    RatioPaymentDeleteDocument, RatioPaymentFiscalizedManuallyDocument,
    RatioPaymentFiscalizeDocument, RatioPaymentFragment, RatioPaymentSetStatusDocument
} from '../queries.generated';

interface Props {
  payment: RatioPaymentFragment;
}

const CanceledBadge = () => <Badge type="accent">ОТКАЗ</Badge>;

const FiscalizeAction: React.FC<Props> = ({ payment }) => {
  const [isKkmUser] = usePermissions(['kkm.kkmserver']);

  if (!isKkmUser) {
    return null;
  }
  if (payment.status !== 'paid') {
    return null;
  }
  if (payment.fiscalization_status !== 'todo') {
    return null;
  }

  return (
    <MutationAction
      mutation={RatioPaymentFiscalizeDocument}
      variables={{
        payment_id: payment.id,
      }}
      refetchQueries={[
        'RatioTrainingBySlug',
        'RatioTickets',
        'RatioTicketById',
      ]}
      title="Напечатать чек"
    />
  );
};

const DeleteAction: React.FC<Props> = ({ payment }) => {
  return (
    <MutationAction
      mutation={RatioPaymentDeleteDocument}
      variables={{ payment_id: payment.id }}
      refetchQueries={[
        'RatioTrainingBySlug',
        'RatioTickets',
        'RatioTicketById',
      ]}
      title="Удалить"
      icon={FaTrash}
    />
  );
};

const FiscalizedManuallyAction: React.FC<Props> = ({ payment }) => {
  if (payment.status !== 'paid') {
    return null;
  }
  if (
    payment.fiscalization_status !== 'todo' &&
    payment.fiscalization_status !== 'in_progress'
  ) {
    return null;
  }

  return (
    <MutationAction
      mutation={RatioPaymentFiscalizedManuallyDocument}
      variables={{
        payment_id: payment.id,
      }}
      title="Чек пробит вручную"
    />
  );
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
  title: string;
}> = ({ payment, status, title }) => {
  return (
    <MutationAction
      mutation={RatioPaymentSetStatusDocument}
      variables={{
        input: {
          payment_id: payment.id,
          status,
        },
      }}
      title={title}
    />
  );
};

const StatusActions: React.FC<Props> = ({ payment }) => {
  return (
    <>
      {payment.status === 'todo' && (
        <SetStatusAction payment={payment} status="paid" title="Оплачен" />
      )}
      {payment.status === 'paid' && (
        <SetStatusAction payment={payment} status="todo" title="Не оплачен" />
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

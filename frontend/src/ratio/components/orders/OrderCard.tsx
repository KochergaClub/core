import 'tippy.js/dist/tippy.css';

import { parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { FaCheck, FaGlobeAfrica, FaRegMoneyBillAlt, FaTicketAlt, FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { YandexKassaPaymentStatus } from '~/apollo/types.generated';
import { HumanizedDateTime, MutationButton } from '~/components';
import { A, Badge, colors, Column, Row } from '~/frontkit';
import { adminTrainingRoute } from '~/ratio/routes';

import { RowWithIcon } from '../../../components';
import TicketTypeBadge from '../ticket-types/TicketTypeBadge';
import {
    CancelYandexKassaPaymentDocument, PaymentForOrderFragment, RatioOrderFragment,
    UpdateYandexKassaPaymentDocument
} from './queries.generated';

const PaymentInfo: React.FC<{ payment: PaymentForOrderFragment }> = ({
  payment,
}) => {
  return (
    <Row vCentered>
      {payment.status === YandexKassaPaymentStatus.WaitingForCapture ? (
        <Badge>Ожидает захвата</Badge>
      ) : payment.status === YandexKassaPaymentStatus.Succeeded ? (
        <Badge>Оплачен</Badge>
      ) : payment.status === YandexKassaPaymentStatus.Pending ? (
        <Badge type="accent">Ожидает оплаты</Badge>
      ) : payment.status === YandexKassaPaymentStatus.Canceled ? (
        <Badge type="accent">Отменён</Badge>
      ) : (
        <div>UNKNOWN</div>
      )}
      {payment.status === YandexKassaPaymentStatus.WaitingForCapture ||
      payment.status === YandexKassaPaymentStatus.Pending ? (
        <MutationButton
          mutation={UpdateYandexKassaPaymentDocument}
          variables={{ id: payment.id }}
          size="small"
        >
          Обновить платёж
        </MutationButton>
      ) : null}
      {payment.status === YandexKassaPaymentStatus.WaitingForCapture ? (
        <MutationButton
          mutation={CancelYandexKassaPaymentDocument}
          variables={{ id: payment.id }}
          size="small"
          confirmText="Если вы отмените платёж, деньги вернутся на счёт клиента, и заказ не сможет быть завершён."
        >
          Отменить платёж
        </MutationButton>
      ) : null}
    </Row>
  );
};

interface Props {
  order: RatioOrderFragment;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  return (
    <Column gutter={12}>
      <Row>
        <small>
          <HumanizedDateTime date={parseISO(order.created)} />
        </small>
        <small style={{ color: colors.grey[400] }}>{order.id}</small>
        <Row vCentered>
          {order.fulfilled ? (
            <Badge hint="Участник успешно зарегистрирован">
              <FaCheck /> Подтверждён
            </Badge>
          ) : (
            <Badge type="accent">Не подтверждён</Badge>
          )}
        </Row>
      </Row>
      <RowWithIcon icon={FaTicketAlt} hint="Тип билета">
        <Row>
          <Link
            href={adminTrainingRoute(order.ticket_type.training.slug)}
            passHref
          >
            <A>{order.ticket_type.training.name}</A>
          </Link>
          <div>&rarr;</div>
          <div>{order.ticket_type.name}</div>
          <TicketTypeBadge ticketType={order.ticket_type} />
          {order.price !== order.ticket_type.price ? (
            <div>
              {' '}
              &rarr;{' '}
              <Badge
                hint={
                  order.promocode
                    ? `Промокод ${order.promocode.code} на ${order.promocode.discount} руб.`
                    : undefined
                }
              >
                {order.price} руб.
              </Badge>
            </div>
          ) : null}
        </Row>
      </RowWithIcon>
      <RowWithIcon icon={MdEmail} hint="E-mail">
        <A href={'mailto:' + order.email}>{order.email}</A>
      </RowWithIcon>
      {order.first_name !== '' || order.last_name !== '' ? (
        <RowWithIcon icon={FaUserAlt} hint="Имя, фамилия">
          {order.first_name} {order.last_name}
        </RowWithIcon>
      ) : null}
      {order.city !== '' ? (
        <RowWithIcon icon={FaGlobeAfrica} hint="Город">
          <div>{order.city}</div>
        </RowWithIcon>
      ) : null}
      <RowWithIcon icon={FaRegMoneyBillAlt} hint="Платёж">
        <PaymentInfo payment={order.payment} />
      </RowWithIcon>
    </Column>
  );
};

export default OrderCard;

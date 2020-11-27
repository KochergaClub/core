import { parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { FaRegMoneyBillAlt, FaTicketAlt, FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { useMutation } from '@apollo/client';

import { HumanizedDateTime } from '~/components';
import Card from '~/components/Card';
import ApolloModalFormButton from '~/components/forms/ApolloModalFormButton';
import { FormShape } from '~/components/forms/types';
import NotionIcon from '~/components/icons/NotionIcon';
import { A, Badge, Column, Row } from '~/frontkit';
import { adminTicketRoute, adminTrainingRoute } from '~/ratio/routes';

import RowWithIcon from '../../../components/RowWithIcon';
import { RatioPaymentAddDocument, RatioTicketFragment } from '../../queries.generated';
import PaymentItem from '../PaymentItem';
import {
    RatioTicketWithTrainingFragment, SetRatioTicketNotionLinkDocument
} from './queries.generated';

const CanceledBadge = () => <Badge>ОТКАЗ</Badge>;

const CreatePaymentButton = ({ ticket_id }: { ticket_id: string }) => {
  const [addMutation] = useMutation(RatioPaymentAddDocument, {
    refetchQueries: ['RatioTrainingBySlug', 'RatioTickets', 'RatioTicketById'],
    awaitRefetchQueries: true,
  });

  const fields: FormShape = [
    { name: 'ticket_id', type: 'string', readonly: true, default: ticket_id },
    { name: 'amount', title: 'Сумма', type: 'number', min: 0, max: 1000000 },
    {
      name: 'fiscalization_status',
      title: 'Нужен чек?',
      type: 'choice',
      widget: 'dropdown',
      default: 'todo',
      options: [
        ['todo', 'Да'],
        ['not_needed', 'Нет'],
      ],
    },
    {
      name: 'payment_type',
      title: 'Вид оплаты',
      type: 'choice',
      widget: 'dropdown',
      default: 'kassa',
      options: [
        ['kassa', 'Яндекс.Касса'],
        ['cash', 'Наличные'],
        ['other', 'Другое'],
      ],
    },
  ];

  return (
    <ApolloModalFormButton
      mutation={addMutation}
      size="small"
      shape={fields}
      buttonName="Добавить платёж"
      modalButtonName="Добавить"
      modalTitle="Добавить платёж"
    />
  );
};

interface Props {
  ticket: RatioTicketFragment | RatioTicketWithTrainingFragment;
}

const RemainingPayments: React.FC<Props> = ({ ticket }) => {
  const paymentsTotal = ticket.payments
    .map((p) => p.amount)
    .reduce((x, y) => x + y, 0);

  const remainingPayments = ticket.payment_amount - paymentsTotal;

  if (remainingPayments === 0) {
    return null; // all payments created
  } else if (remainingPayments > 0) {
    return (
      <Badge>Не хватает платежей на сумму: {remainingPayments} руб.</Badge>
    );
  } else {
    return (
      <Badge type="accent">Сумма платежей превышает стоимость билета!</Badge>
    );
  }
};

const NotionLinkRow: React.FC<Props> = ({ ticket }) => {
  const [updateMutation] = useMutation(SetRatioTicketNotionLinkDocument);

  if (!ticket.need_notion_link && !ticket.notion_link) {
    return null;
  }

  return (
    <RowWithIcon icon={NotionIcon} hint="Notion">
      <Row>
        <A href={ticket.notion_link}>{ticket.notion_link}</A>
        {ticket.notion_link ? null : (
          <ApolloModalFormButton
            mutation={updateMutation}
            size="small"
            shape={[
              {
                name: 'id',
                type: 'string',
                readonly: true,
                default: ticket.id,
              },
              {
                name: 'notion_link',
                type: 'string',
                default: ticket.notion_link,
              },
            ]}
            modalTitle="Добавить Notion-ссылку"
            modalButtonName="Добавить"
            buttonName="Добавить Notion-ссылку"
          />
        )}
      </Row>
    </RowWithIcon>
  );
};

const TicketTrainingAndType: React.FC<Props> = ({ ticket }) => {
  const training = 'training' in ticket ? ticket.training : undefined;
  const { ticket_type } = ticket;

  const ticketTypeElement = (
    <div>
      {
        ticket_type ? ticket_type.name : <em>[Неизвестный тип билета]</em> // possible for old tickets on training page
      }
    </div>
  );

  if (training) {
    return (
      <Row>
        <Link href={adminTrainingRoute(training.slug)} passHref>
          <A>{training.name}</A>
        </Link>
        <div>&rarr;</div>
        {ticketTypeElement}
      </Row>
    );
  } else {
    return ticketTypeElement;
  }
};

const TicketCard: React.FC<Props> = ({ ticket }) => {
  return (
    <Card>
      <Column gutter={12}>
        <Row>
          <Link href={adminTicketRoute(ticket.id)} passHref>
            <A>
              <small>
                <HumanizedDateTime date={parseISO(ticket.created)} />
              </small>
            </A>
          </Link>
        </Row>
        <RowWithIcon icon={FaTicketAlt} hint="Тип билета">
          <TicketTrainingAndType ticket={ticket} />
        </RowWithIcon>
        <RowWithIcon icon={MdEmail} hint="E-mail">
          <A href={'mailto:' + ticket.email}>{ticket.email}</A>
        </RowWithIcon>
        <RowWithIcon icon={FaUserAlt} hint="Имя, фамилия">
          {ticket.first_name} {ticket.last_name}
        </RowWithIcon>
        <RowWithIcon icon={FaRegMoneyBillAlt} hint="Стоимость">
          <Row>
            <div>{ticket.payment_amount} руб.</div>
            <RemainingPayments ticket={ticket} />
          </Row>
        </RowWithIcon>
        <NotionLinkRow ticket={ticket} />
        {ticket.status === 'canceled' && <CanceledBadge />}
        <Column>
          <Row vCentered>
            <strong>Платежи</strong>
            <CreatePaymentButton ticket_id={ticket.id} />
          </Row>
          {ticket.payments.map((payment) => (
            <PaymentItem payment={payment} key={payment.id} />
          ))}
        </Column>
      </Column>
    </Card>
  );
};

export default TicketCard;

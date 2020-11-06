import { parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

import { useMutation } from '@apollo/client';

import { Badge, HumanizedDateTime } from '~/components';
import Card from '~/components/Card';
import ApolloModalFormButton from '~/components/forms/ApolloModalFormButton';
import { FormShape } from '~/components/forms/types';
import { A, Column, Label, Row } from '~/frontkit';
import { adminTicketRoute, adminTrainingRoute } from '~/ratio/routes';

import { RatioPaymentAddDocument, RatioTicketFragment } from '../../queries.generated';
import PaymentItem from '../PaymentItem';
import { RatioTicketWithTrainingFragment } from './queries.generated';

const CanceledBadge = () => <Badge>ОТКАЗ</Badge>;

const CreatePaymentButton = ({ ticket_id }: { ticket_id: string }) => {
  const [addMutation] = useMutation(RatioPaymentAddDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const fields: FormShape = [
    { name: 'ticket_id', type: 'fk', readonly: true, default: ticket_id },
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
      small
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
  const remaining =
    ticket.payment_amount -
    ticket.payments.map((p) => p.amount).reduce((x, y) => x + y, 0);

  if (remaining === 0) {
    return null; // all payments created
  } else if (remaining > 0) {
    return <Badge>Не хватает платежей на сумму: {remaining} руб.</Badge>;
  } else {
    return (
      <Badge type="accent">Сумма платежей превышает стоимость билета!</Badge>
    );
  }
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
      <Column>
        <Row>
          <Link href={adminTicketRoute(ticket.id)} passHref>
            <A>
              <small>
                <HumanizedDateTime date={parseISO(ticket.created)} />
              </small>
            </A>
          </Link>
        </Row>
        <Column>
          <Row gutter={10}>
            <strong>
              {ticket.first_name} {ticket.last_name}
            </strong>
            <div>
              <A href={`mailto:${ticket.email}`}>{ticket.email}</A>
            </div>
          </Row>
          <TicketTrainingAndType ticket={ticket} />
          <div>{ticket.payment_amount} руб.</div>
          {ticket.status === 'canceled' && <CanceledBadge />}
        </Column>
        <Column>
          <Row vCentered>
            <Label>Платежи</Label>
            <CreatePaymentButton ticket_id={ticket.id} />
          </Row>
          {ticket.payments.map((payment) => (
            <PaymentItem payment={payment} key={payment.id} />
          ))}
          <RemainingPayments ticket={ticket} />
        </Column>
      </Column>
    </Card>
  );
};

export default TicketCard;

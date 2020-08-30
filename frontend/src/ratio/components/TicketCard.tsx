import { A, Column, Label, Row } from '@kocherga/frontkit';

import { Badge } from '~/components';
import Card from '~/components/Card';
import ApolloModalFormButton from '~/components/forms/ApolloModalFormButton';
import { FormShape } from '~/components/forms/types';

import { RatioTicketFragment, useRatioPaymentAddMutation } from '../queries.generated';
import PaymentItem from './PaymentItem';

const CanceledBadge = () => <Badge>ОТКАЗ</Badge>;

const CreatePaymentButton = ({ ticket_id }: { ticket_id: string }) => {
  const [addMutation] = useRatioPaymentAddMutation({
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const fields: FormShape = [
    { name: 'ticket_id', type: 'fk', readonly: true, value: ticket_id },
    { name: 'amount', title: 'Сумма', type: 'number', min: 0, max: 1000000 },
    {
      name: 'fiscalization_status',
      title: 'Нужен чек?',
      type: 'choice',
      widget: 'dropdown',
      value: 'todo',
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
      value: 'kassa',
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
  ticket: RatioTicketFragment;
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

const TicketCard: React.FC<Props> = ({ ticket }) => {
  return (
    <Card>
      <Row gutter={32}>
        <Column>
          <Row gutter={10}>
            <strong>
              {ticket.first_name} {ticket.last_name}
            </strong>
            <div>
              <A href={`mailto:${ticket.email}`}>{ticket.email}</A>
            </div>
          </Row>
          <div>{ticket.payment_amount} руб.</div>
          <div>{ticket.registration_date}</div>
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
      </Row>
    </Card>
  );
};

export default TicketCard;

import { FormShape } from '~/components/forms/types';
import { RatioTrainingFragment } from '~/ratio/queries.generated';

export const buildTicketFields = (
  training: RatioTrainingFragment
): FormShape => [
  { name: 'email', type: 'email' },
  { name: 'first_name', title: 'Имя', type: 'string' },
  { name: 'last_name', title: 'Фамилия', type: 'string' },
  { name: 'payment_amount', title: 'Стоимость билета', type: 'number' },
  {
    name: 'ticket_type',
    title: 'Тип билета',
    type: 'choice',
    optional: true,
    options: training.ticket_types.map((ticket_type) => [
      ticket_type.id,
      ticket_type.name,
    ]),
  },
];

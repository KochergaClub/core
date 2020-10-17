import { useCallback } from 'react';

import { useMutation } from '@apollo/client';
import { Column, Row } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';
import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { RatioAddTicketDocument, RatioTrainingFragment } from '../queries.generated';
import TicketList from './TicketList';

const CreateTicketButton = ({ training_id }: { training_id: string }) => {
  const [addTicketMutation] = useMutation(RatioAddTicketDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const fields: FormShape = [
    { name: 'email', type: 'email' },
    { name: 'first_name', title: 'Имя', type: 'string' },
    { name: 'last_name', title: 'Фамилия', type: 'string' },
    { name: 'payment_amount', title: 'Стоимость билета', type: 'number' },
    {
      name: 'ticket_type',
      title: 'Вид билета',
      type: 'choice',
      options: [
        ['normal', 'Обычный'],
        ['stipend', 'Стипендия'],
        ['staff', 'Стафф'],
        ['free-repeat', 'Бесплатный повтор'],
      ],
      default: 'normal',
    },
  ];

  type Values = {
    email: string;
    first_name: string;
    last_name: string;
    payment_amount: number;
  };

  const cb = useCallback(
    async (values: Values) => {
      const { data } = await addTicketMutation({
        variables: {
          params: {
            training: training_id,
            email: values.email,
            payment_amount: values.payment_amount,
            first_name: values.first_name,
            last_name: values.last_name,
            ticket_type: 'normal',
          },
        },
      });

      if (!data) {
        throw new Error('add ticket failed');
      }
    },
    [addTicketMutation, training_id]
  );

  return (
    <ModalFormButton
      post={cb}
      shape={fields}
      buttonName="Добавить"
      modalButtonName="Добавить"
      modalTitle="Добавить билет"
    />
  );
};

interface Props {
  training: RatioTrainingFragment;
}

const TrainingTicketsBlock: React.FC<Props> = ({ training }) => {
  return (
    <PaddedBlock width="max">
      <h2>
        <Row>
          <div>Участники: {training.tickets.length}</div>
          <CreateTicketButton training_id={training.id} />
        </Row>
      </h2>
      <Column stretch>
        <TicketList tickets={training.tickets} />
      </Column>
    </PaddedBlock>
  );
};

export default TrainingTicketsBlock;

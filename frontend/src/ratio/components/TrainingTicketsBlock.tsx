import React, { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { PaddedBlock } from '~/components';
import { FormShapeModalButton } from '~/components/forms2';
import { Column, Row } from '~/frontkit';

import { RatioAddTicketDocument, RatioTrainingFragment } from '../queries.generated';
import TicketList from './tickets/TicketList';

const CreateTicketButton = ({ training_id }: { training_id: string }) => {
  const [addTicketMutation] = useMutation(RatioAddTicketDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const fields = [
    { name: 'email', type: 'email' },
    { name: 'first_name', title: 'Имя', type: 'string' },
    { name: 'last_name', title: 'Фамилия', type: 'string' },
    { name: 'payment_amount', title: 'Стоимость билета', type: 'number' },
    {
      name: 'ticket_class',
      title: 'Вид билета',
      type: 'choice',
      options: [
        ['normal', 'Обычный'],
        ['stipend', 'Стипендия'],
        ['staff', 'Стафф'],
        ['free-repeat', 'Бесплатный повтор'],
      ],
    },
  ] as const;

  type Values = {
    email: string;
    first_name: string;
    last_name: string;
    payment_amount: string;
  };

  const cb = useCallback(
    async (values: Values) => {
      const { data } = await addTicketMutation({
        variables: {
          params: {
            training: training_id,
            email: values.email,
            payment_amount: parseInt(values.payment_amount, 10),
            first_name: values.first_name,
            last_name: values.last_name,
            ticket_class: 'normal',
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
    <FormShapeModalButton
      post={cb}
      shape={fields}
      buttonName="Добавить"
      modalButtonName="Добавить"
      modalTitle="Добавить билет"
      defaultValues={{
        ticket_class: 'normal',
      }}
    />
  );
};

interface Props {
  training: RatioTrainingFragment;
}

const TrainingTicketsBlock: React.FC<Props> = ({ training }) => {
  return (
    <PaddedBlock width="wide">
      <h2>
        <Row vCentered gutter={8}>
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

import { useCallback } from 'react';
import { A, Column, Row } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';
import { FormShape } from '~/components/forms/types';
import ModalFormButton from '~/components/forms/ModalFormButton';

import TicketList from './TicketList';

import {
  RatioTrainingFragment,
  useRatioAddTicketMutation,
  useRatioPaymentAddMutation,
} from '../queries.generated';

const CreateTicketButton = ({ training_id }: { training_id: string }) => {
  const [addTicketMutation] = useRatioAddTicketMutation({
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const [addPaymentMutation] = useRatioPaymentAddMutation({
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const fields: FormShape = [
    { name: 'email', type: 'email' },
    { name: 'first_name', title: 'Имя', type: 'string' },
    { name: 'last_name', title: 'Фамилия', type: 'string' },
    { name: 'payment_amount', title: 'Стоимость билета', type: 'number' },
  ];
  // exclude: ['id'],
  // transform: {
  //   training: f =>
  //     ({
  //       ...f,
  //       value: training_id,
  //       readonly: true,
  //     } as FormField),
  //   status: f => ({ ...f, value: 'normal' } as FormField),
  //   ticket_type: f => ({ ...f, value: 'normal' } as FormField),
  // },

  const cb = useCallback(
    async (values: unknown) => {
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

      await addPaymentMutation({
        variables: {
          params: {
            ticket_id: data?.ratioAddTicket.id,
          },
        },
      });
    },
    [addTicketMutation, addPaymentMutation]
  );

  return (
    <ModalFormButton
      post={cb}
      fields={fields}
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
          <div>Участники:</div>
          <A href={`/admin/ratio/ticket/?training__id__exact=${training.id}`}>
            {training.tickets.length}
          </A>
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

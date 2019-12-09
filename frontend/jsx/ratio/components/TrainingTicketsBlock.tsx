import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { A, Column, Row } from '@kocherga/frontkit';

import { useDispatch } from '~/common/hooks';

import { PaddedBlock } from '~/components';
import CreateButton from '~/components/crud/CreateButton';
import { FormShape } from '~/components/forms/types';

import { selectTraining } from '~/ratio/features/trainingItem';
import {
  loadTrainingTickets,
  selectTrainingTickets,
} from '~/ratio/features/trainingTickets';

import TicketList from './TicketList';

const CreateTicketButton = ({
  training_id,
  onCreate,
}: {
  training_id: number;
  onCreate: () => void;
}) => {
  const fields: FormShape = [
    { name: 'training', type: 'number', readonly: true, value: training_id },
    { name: 'email', type: 'string' },
    { name: 'first_name', type: 'string' },
    { name: 'last_name', type: 'string' },
    { name: 'payment_amount', type: 'number' },
    {
      name: 'fiscalization_status',
      type: 'choice',
      options: ['todo', 'fiscalized'],
      value: 'todo',
    },
    {
      name: 'ticket_type',
      type: 'choice',
      options: ['normal', 'stipend', 'staff'],
      value: 'normal',
    },
    {
      name: 'payment_type',
      type: 'choice',
      options: ['website', 'invoice', 'transfer'],
      value: 'website',
    },
  ];

  return (
    <CreateButton
      apiEndpoint="/ratio/ticket"
      fields={fields}
      onCreate={onCreate}
    />
  );
};

const TrainingTicketsBlock = () => {
  const dispatch = useDispatch();

  const tickets = useSelector(selectTrainingTickets);
  const training = useSelector(selectTraining);

  if (!training) {
    throw new Error('No training');
  }

  const onCreateTicket = useCallback(async () => {
    if (!training) {
      throw new Error('No training');
    }
    await dispatch(loadTrainingTickets(training.slug));
  }, [training]);

  return (
    <PaddedBlock width="max">
      <h2>
        <Row>
          <div>Участники:</div>
          <A href={`/admin/ratio/ticket/?training__id__exact=${training.id}`}>
            {tickets.length}
          </A>
          <CreateTicketButton
            training_id={training.id}
            onCreate={onCreateTicket}
          />
        </Row>
      </h2>
      <Column stretch>
        <TicketList tickets={tickets} />
      </Column>
    </PaddedBlock>
  );
};

export default TrainingTicketsBlock;

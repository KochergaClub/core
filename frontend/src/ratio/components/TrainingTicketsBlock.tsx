import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { A, Column, Row } from '@kocherga/frontkit';

import { useDispatch } from '~/common/hooks';
import shapes from '~/shapes';

import { PaddedBlock } from '~/components';
import CreateButton from '~/components/crud/CreateButton';
import { FormField } from '~/components/forms/types';
import { transformShape } from '~/components/forms/utils';

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
  const fields = transformShape(shapes.ratio.ticket, {
    exclude: ['id'],
    transform: {
      training: f =>
        ({
          ...f,
          value: training_id,
          readonly: true,
        } as FormField),
      status: f => ({ ...f, value: 'normal' } as FormField),
      fiscalization_status: f => ({ ...f, value: 'todo' } as FormField),
      ticket_type: f => ({ ...f, value: 'normal' } as FormField),
      payment_type: f => ({ ...f, value: 'website' } as FormField),
    },
  });

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

import { A, Column, Row } from '@kocherga/frontkit';

import shapes from '~/shapes';

import { PaddedBlock } from '~/components';
import { FormField } from '~/components/forms/types';
import ApolloModalFormButton from '~/components/forms/ApolloModalFormButton';
import { transformShape } from '~/components/forms/utils';

import TicketList from './TicketList';

import {
  TrainingFragment,
  useRatioAddTicketMutation,
} from '../queries.generated';

const CreateTicketButton = ({ training_id }: { training_id: string }) => {
  const [addMutation] = useRatioAddTicketMutation({
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

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
    <ApolloModalFormButton
      mutation={addMutation}
      fields={fields}
      buttonName="Добавить"
      modalButtonName="Добавить"
      modalTitle="Добавить билет"
    />
  );
};

interface Props {
  training: TrainingFragment;
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

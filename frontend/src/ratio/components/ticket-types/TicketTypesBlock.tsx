import { PaddedBlock } from '~/components';
import { Row } from '~/frontkit';

import { RatioTrainingFragment } from '../../queries.generated';
import CreateTicketTypeButton from './CreateTicketTypeButton';
import TicketTypeList from './TicketTypeList';

interface Props {
  training: RatioTrainingFragment;
}

const TicketTypesBlock: React.FC<Props> = ({ training }) => {
  return (
    <PaddedBlock width="max">
      <h2>
        <Row gutter={8} vCentered>
          <div>Виды билетов</div>
          <CreateTicketTypeButton training_id={training.id} />
        </Row>
      </h2>
      <TicketTypeList ticketTypes={training.ticket_types} />
    </PaddedBlock>
  );
};

export default TicketTypesBlock;

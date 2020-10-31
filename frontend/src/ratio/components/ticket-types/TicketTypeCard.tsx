import Card from '~/components/Card';
import DropdownMenu, { ModalAction } from '~/components/DropdownMenu';
import { Row } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import EditTicketTypeModal from './EditTicketTypeModal';

interface Props {
  ticketType: RatioTicketTypeFragment;
}

const TicketTypeCard: React.FC<Props> = ({ ticketType }) => {
  return (
    <Card>
      <header>
        <Row spaced>
          <strong>{ticketType.price} руб.</strong>
          <DropdownMenu>
            <ModalAction title="Редактировать">
              {({ close }) => (
                <EditTicketTypeModal close={close} ticketType={ticketType} />
              )}
            </ModalAction>
          </DropdownMenu>
        </Row>
      </header>
      <div>{ticketType.name}</div>{' '}
    </Card>
  );
};

export default TicketTypeCard;

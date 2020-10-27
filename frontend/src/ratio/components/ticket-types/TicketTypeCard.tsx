import Card from '~/components/Card';

import { RatioTicketTypeFragment } from '../../queries.generated';
import EditTicketTypeLink from './EditTicketTypeLink';

interface Props {
  ticketType: RatioTicketTypeFragment;
}

const TicketTypeCard: React.FC<Props> = ({ ticketType }) => {
  return (
    <EditTicketTypeLink key={ticketType.id} ticketType={ticketType}>
      <Card>
        <header>
          <strong>{ticketType.price} руб.</strong>
        </header>
        <div>{ticketType.name}</div>{' '}
      </Card>
    </EditTicketTypeLink>
  );
};

export default TicketTypeCard;

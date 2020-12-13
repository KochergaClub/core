import { CardList } from '~/components/cards';

import { RatioTicketFragment } from '../../queries.generated';
import TicketCard from './TicketCard';

const TicketList = ({ tickets }: { tickets: RatioTicketFragment[] }) => {
  return (
    <CardList>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.email} ticket={ticket} />
      ))}
    </CardList>
  );
};

export default TicketList;

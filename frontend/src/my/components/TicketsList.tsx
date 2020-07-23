import { useMemo } from 'react';

import { differenceInHours, parseISO } from 'date-fns';

import { Row } from '@kocherga/frontkit';

import { CardList } from '~/components/Card';

import { MyTicketsPageFragment } from '../queries.generated';

import TicketCard from './TicketCard';

interface Props {
  my: MyTicketsPageFragment;
}

type TicketType = MyTicketsPageFragment['tickets']['nodes'][0];

const TicketsSublist: React.FC<{
  tickets: TicketType[];
  title: string;
  later?: boolean;
}> = ({ tickets, title, later }) => {
  if (!tickets.length) {
    return null;
  }

  return (
    <section>
      <Row centered>
        <h3>{title}:</h3>
      </Row>
      <CardList>
        {tickets.map(ticket => (
          <TicketCard key={ticket.event.id} ticket={ticket} later={later} />
        ))}
      </CardList>
    </section>
  );
};

const TicketsList: React.FC<Props> = ({ my }) => {
  // cancelled tickets stay in the list so we have to filter tickets by status here
  const tickets = my.tickets.nodes.filter(t => t.status === 'ok');

  const LATER_THRESHOLD = 12;

  const condition = (ticket: TicketType) =>
    differenceInHours(parseISO(ticket.event.start), new Date()) <
    LATER_THRESHOLD;

  const soonTickets = useMemo(() => tickets.filter(condition), [tickets]);

  const laterTickets = useMemo(
    () => tickets.filter(ticket => !condition(ticket)),
    [tickets]
  );

  if (!tickets.length) {
    return (
      <Row centered>
        <em>Вы не зарегистрированы ни на одно событие.</em>
      </Row>
    );
  }

  return (
    <div>
      <TicketsSublist title="Скоро" tickets={soonTickets} />
      <TicketsSublist title="Позже" tickets={laterTickets} later={true} />
    </div>
  );
};

export default TicketsList;

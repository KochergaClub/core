import { useSelector } from 'react-redux';

import { Row } from '@kocherga/frontkit';

import { State } from '~/redux/store';

import Card, { CardList } from '~/components/Card';
import Badge from '~/components/Badge';

import { selectEventTickets } from '../../selectors';

interface Props {
  event_id: string;
}

const TicketsCollection: React.FC<Props> = ({ event_id }) => {
  const tickets = useSelector((state: State) =>
    selectEventTickets(state, event_id)
  );

  return (
    <section>
      <h2>Билеты ({tickets.length})</h2>
      <CardList>
        {tickets.map(ticket => (
          <Card>
            <Row>
              <div>{ticket.user}</div>
              <Badge>{ticket.status}</Badge>
            </Row>
          </Card>
        ))}
      </CardList>
    </section>
  );
};

export default TicketsCollection;

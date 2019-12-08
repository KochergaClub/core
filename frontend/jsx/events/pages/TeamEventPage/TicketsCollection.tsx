import { useSelector } from 'react-redux';

import { Row } from '@kocherga/frontkit';

import { State } from '~/redux/store';

import Card, { CardList } from '~/components/Card';
import { Badge } from '~/components';

import { selectEventTickets } from '../../features/eventPageTickets';

const TicketsCollection: React.FC = () => {
  const tickets = useSelector((state: State) => selectEventTickets(state));

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

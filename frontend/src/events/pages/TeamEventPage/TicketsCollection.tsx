import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import Card, { CardList } from '~/components/Card';
import { Badge, Row } from '~/frontkit';

import { GetEventTicketsDocument } from './queries.generated';

interface Props {
  event_id: string;
}

const TicketsCollection: React.FC<Props> = ({ event_id }) => {
  const queryResults = useQuery(GetEventTicketsDocument, {
    variables: {
      event_id,
    },
  });

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { event } }) =>
        event ? (
          <section>
            <h2>Билеты ({event.tickets.length})</h2>
            <CardList>
              {event.tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <Row>
                    <div>{ticket.user.email}</div>
                    <Badge>{ticket.status}</Badge>
                  </Row>
                </Card>
              ))}
            </CardList>
          </section>
        ) : (
          <div>Событие не найдено</div>
        )
      }
    </ApolloQueryResults>
  );
};

export default TicketsCollection;

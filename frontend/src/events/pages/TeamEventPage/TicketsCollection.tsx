import { Row } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';
import { ApolloQueryResults, Badge } from '~/components';

import { useGetEventTicketsQuery } from './queries.generated';

interface Props {
  event_id: string;
}

const TicketsCollection: React.FC<Props> = ({ event_id }) => {
  const queryResults = useGetEventTicketsQuery({
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
              {event.tickets.map(ticket => (
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

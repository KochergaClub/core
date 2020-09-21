import { useQuery } from '@apollo/client';
import { A, Column } from '@kocherga/frontkit';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';
import EventInfo from '~/events/components/EventInfo';
import { TeamEventDetailsDocument } from '~/events/queries.generated';

import FeedbackCollection from './FeedbackCollection';
import TicketsCollection from './TicketsCollection';

interface Props {
  event_id: string;
}

const TeamEventPage: NextApolloPage<Props> = ({ event_id }) => {
  const queryResults = useQuery(TeamEventDetailsDocument, {
    variables: { id: event_id },
  });

  return (
    <Page
      title={
        queryResults.data
          ? queryResults.data.event?.title || 'Событие не найдено'
          : 'Загружается...'
      }
      menu="team"
    >
      <ApolloQueryResults {...queryResults}>
        {({ data: { event } }) => {
          if (!event) {
            return <Page.Title>СОБЫТИЕ НЕ НАЙДЕНО</Page.Title>;
          }
          return (
            <>
              <Page.Title>{event.title}</Page.Title>
              <Page.Main>
                <PaddedBlock width="max">
                  <EventInfo event={event} />
                  <Column>
                    <A href={`/team/evenman/event/${event.id}`}>
                      Открыть в evenman
                    </A>
                    {event.event_type === 'public' && (
                      <A href={`/events/${event.id}`}>Открыть на сайте</A>
                    )}
                  </Column>
                </PaddedBlock>
                <PaddedBlock width="max">
                  <FeedbackCollection event={event} />
                </PaddedBlock>
                <PaddedBlock width="max">
                  <TicketsCollection event_id={event.id} />
                </PaddedBlock>
              </Page.Main>
            </>
          );
        }}
      </ApolloQueryResults>
    </Page>
  );
};

TeamEventPage.getInitialProps = async ({ query }) => {
  return { event_id: query.uuid as string };
};

export default withApollo(withStaff(TeamEventPage));

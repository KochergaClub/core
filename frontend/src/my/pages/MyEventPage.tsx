import { useQuery } from '@apollo/client';
import { A } from '@kocherga/frontkit';

import { NextApolloPage, withApollo } from '~/apollo';
import { requireAuth } from '~/auth/utils';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';
import ErrorBlock from '~/error-pages/ErrorBlock';

import EventCall from '../components/EventCall';
import { MyEventPageDocument } from '../queries.generated';

interface Props {
  event_id: string;
}

const MyEventPage: NextApolloPage<Props> = ({ event_id }) => {
  const queryResults = useQuery(MyEventPageDocument, { variables: { event_id } });

  const event = queryResults.data?.publicEvent;
  const loading = queryResults.loading;

  return (
    <Page
      title={loading ? 'Загружается...' : event?.title || 'Событие не найдено'}
    >
      <ApolloQueryResults {...queryResults} size="block">
        {() => {
          if (!event) {
            return <ErrorBlock code={404} title="Событие не найдено" />;
          }

          return (
            <>
              <Page.Title>{event.title}</Page.Title>
              <Page.Main>
                <PaddedBlock>
                  {event.my_ticket?.status === 'ok' ? (
                    <EventCall event_id={event_id} />
                  ) : (
                    <div>
                      Вы не регистрировались на это мероприятие.{' '}
                      <A href={`/events/${event_id}`}>
                        Хотите зарегистрироваться?
                      </A>
                    </div>
                  )}
                </PaddedBlock>
              </Page.Main>
            </>
          );
        }}
      </ApolloQueryResults>
    </Page>
  );
};

MyEventPage.getInitialProps = async ({ query, apolloClient }) => {
  await requireAuth(apolloClient, { is_authenticated: true });

  const event_id = query.id as string;

  return { event_id };
};

export default withApollo(MyEventPage);

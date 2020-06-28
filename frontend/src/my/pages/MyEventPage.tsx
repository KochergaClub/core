import { A } from '@kocherga/frontkit';

import { NextApolloPage, withApollo } from '~/apollo';
import { Page, ApolloQueryResults, PaddedBlock } from '~/components';
import { requireAuth } from '~/auth/utils';

import { useMyEventPageQuery } from '../queries.generated';
import EventCall from '../components/EventCall';

interface Props {
  event_id: string;
}

const MyEventPage: NextApolloPage<Props> = ({ event_id }) => {
  const queryResults = useMyEventPageQuery({ variables: { event_id } });

  return (
    <Page
      title={
        queryResults.data
          ? queryResults.data.publicEvent.title
          : 'Загружается...'
      }
    >
      <ApolloQueryResults {...queryResults} size="block">
        {({ data: { publicEvent } }) => (
          <>
            <Page.Title>{publicEvent.title}</Page.Title>
            <Page.Main>
              <PaddedBlock>
                {publicEvent.my_ticket?.status === 'ok' ? (
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
        )}
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

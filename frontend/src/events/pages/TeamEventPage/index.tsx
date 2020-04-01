import { useSelector } from 'react-redux';

import { A, Column } from '@kocherga/frontkit';

import { withApollo, NextApolloPage } from '~/apollo';

import { State } from '~/redux/store';
import { Page, PaddedBlock } from '~/components';

import { loadEvent, selectEvent } from '~/events/features/eventPage';

import EventInfo from '~/events/components/EventInfo';
import FeedbackCollection from './FeedbackCollection';
import TicketsCollection from './TicketsCollection';

import { loadEventFeedbacks } from '~/events/features/eventPageFeedbacks';

const TeamEventPage: NextApolloPage = () => {
  const event = useSelector((state: State) => selectEvent(state));

  return (
    <Page title={event.title} menu="team">
      <Page.Title>{event.title}</Page.Title>
      <Page.Main>
        <PaddedBlock width="max">
          <EventInfo />
          <Column>
            <A href={`/team/evenman/event/${event.id}`}>Открыть в evenman</A>
            {event.type === 'public' && (
              <A href={`/events/${event.id}`}>Открыть на сайте</A>
            )}
          </Column>
        </PaddedBlock>
        <PaddedBlock width="max">
          <FeedbackCollection />
        </PaddedBlock>
        <PaddedBlock width="max">
          <TicketsCollection event_id={event.id} />
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

TeamEventPage.getInitialProps = async ({ store: { dispatch }, query }) => {
  const uuid = query.uuid as string;

  await dispatch(loadEvent(uuid));
  await dispatch(loadEventFeedbacks());

  return { event_id: uuid };
};

export default withApollo(TeamEventPage);

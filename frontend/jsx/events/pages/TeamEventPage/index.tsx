import { useSelector } from 'react-redux';

import { A } from '@kocherga/frontkit';

import { State } from '~/redux/store';
import { NextPage } from '~/common/types';
import { Page } from '~/components';

import { loadEvent, selectEvent } from '~/events/features/eventPage';

import EventInfo from '~/events/components/EventInfo';
import FeedbackCollection from './FeedbackCollection';
import TicketsCollection from './TicketsCollection';

import { loadEventFeedbacks } from '~/events/features/eventPageFeedbacks';
import { loadEventTickets } from '~/events/features/eventPageTickets';

const TeamEventPage: NextPage = () => {
  const event = useSelector((state: State) => selectEvent(state));

  return (
    <Page title={event.title} team>
      <Page.Title>{event.title}</Page.Title>
      <Page.Main>
        <EventInfo />
        <div>
          <A href={`/team/evenman/event/${event.id}`}>Событие в evenman</A>
        </div>
        <FeedbackCollection />
        <TicketsCollection />
      </Page.Main>
    </Page>
  );
};

TeamEventPage.getInitialProps = async ({ store: { dispatch }, query }) => {
  const uuid = query.uuid as string;

  await dispatch(loadEvent(uuid));
  await dispatch(loadEventFeedbacks());
  await dispatch(loadEventTickets());

  return { event_id: uuid };
};

export default TeamEventPage;

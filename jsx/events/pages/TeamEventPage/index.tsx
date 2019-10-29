import { useSelector } from 'react-redux';

import { A } from '@kocherga/frontkit';

import { State } from '~/redux/store';
import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadEvent } from '~/events/actions';
import { selectEventById } from '~/events/selectors';

import EventInfo from '~/events/components/EventInfo';
import FeedbackCollection from './FeedbackCollection';
import TicketsCollection from './TicketsCollection';

import { loadEventFeedbacks, loadEventTickets } from '~/events/actions';

interface Props {
  event_id: string;
}

const TeamEventPage: NextPage<Props> = ({ event_id }) => {
  const event = useSelector((state: State) => selectEventById(state, event_id));

  return (
    <Page title={event.title} team>
      <Page.Title>{event.title}</Page.Title>
      <Page.Main>
        <EventInfo event_id={event_id} />
        <div>
          <A href={`https://evenman.team.kocherga.club/event/${event.id}`}>
            Событие в evenman
          </A>
        </div>
        <FeedbackCollection event_id={event.id} />
        <TicketsCollection event_id={event.id} />
      </Page.Main>
    </Page>
  );
};

TeamEventPage.getInitialProps = async ({ store: { dispatch }, query }) => {
  const uuid = query.uuid as string;

  await dispatch(loadEvent(uuid));
  await dispatch(loadEventFeedbacks(uuid));
  await dispatch(loadEventTickets(uuid));

  return { event_id: uuid };
};

export default TeamEventPage;

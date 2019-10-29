import { A } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { selectAPI } from '~/core/selectors';

import { getEvent } from '~/events/api';
import { ServerEvent, serverEventToEvent } from '~/events/types';

import EventInfo from '~/events/components/EventInfo';
import FeedbackCollection from './FeedbackCollection';
import TicketsCollection from './TicketsCollection';

import { loadEventFeedbacks, loadEventTickets } from '~/events/actions';

interface Props {
  serverEvent: ServerEvent;
}

const TeamEventPage: NextPage<Props> = ({ serverEvent }) => {
  const event = serverEventToEvent(serverEvent);

  return (
    <Page title={event.title} team>
      <Page.Title>{event.title}</Page.Title>
      <Page.Main>
        <EventInfo event={event} />
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

TeamEventPage.getInitialProps = async ({
  store: { getState, dispatch },
  query,
}) => {
  const uuid = query.uuid as string;

  const api = selectAPI(getState());
  const serverEvent = await getEvent(api, uuid);

  await dispatch(loadEventFeedbacks(uuid));
  await dispatch(loadEventTickets(uuid));

  return { serverEvent };
};

export default TeamEventPage;

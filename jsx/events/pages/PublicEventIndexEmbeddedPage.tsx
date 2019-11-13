import { NextPage } from '~/common/types';
import { formatDate } from '~/common/utils';
import { selectAPI } from '~/core/selectors';

import PaddedBlock from '~/components/PaddedBlock';
import EventsList from '~/events/components/EventsList';
import Page from '~/components/Page';

import { ServerPublicEvent, serverPublicEventToEvent } from '~/events/types';

export interface Props {
  events: ServerPublicEvent[];
}

const PublicEventIndexPage: NextPage<Props> = ({ events: serverEvents }) => {
  const events = serverEvents.map(serverPublicEventToEvent);

  return (
    <Page title="Расписание мероприятий - iframe" chrome="none">
      <PaddedBlock>
        <EventsList events={events} />
      </PaddedBlock>
    </Page>
  );
};

PublicEventIndexPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());

  const from_date = new Date();
  const events = (await api.call(
    `public_events?from_date=${formatDate(from_date, 'yyyy-MM-dd')}`,
    'GET'
  )) as ServerPublicEvent[];

  return { events };
};

export default PublicEventIndexPage;

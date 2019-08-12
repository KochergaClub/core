import React from 'react';

import { NextPage } from '~/common/types';
import { formatDate } from '~/common/utils';
import { selectAPI } from '~/core/selectors';

import Page from '~/components/Page';
import WorkInProgress from '~/components/WorkInProgress';

import { PublicEvent, ServerPublicEvent } from '~/events/types';

import EventsList from '~/frontpage/components/EventsList';

interface Props {
  events: ServerPublicEvent[];
}

const FrontPage: NextPage<Props> = ({ events: serverEvents }) => {
  const events = serverEvents.map(serverEvent => ({
    ...serverEvent,
    start: new Date(serverEvent.start),
    end: new Date(serverEvent.end),
  })) as PublicEvent[];

  return (
    <Page title="Кочерга">
      <Page.Title>Кочерга</Page.Title>
      <Page.Main wide>
        <WorkInProgress />
        <EventsList events={events} />
      </Page.Main>
    </Page>
  );
};

FrontPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());

  const from_date = new Date();
  const events = await api.call(
    `public_events?from_date=${formatDate(from_date, 'yyyy-MM-dd')}`,
    'GET'
  );

  return { events };
};

export default FrontPage;

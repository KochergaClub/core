import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import { formatDate } from '../common/utils';

import Page from '../components/Page';
import PageTitle from '../components/PageTitle';
import WorkInProgress from '../components/WorkInProgress';

import { PublicEvent, ServerPublicEvent } from '../events/types';

import EventsList from './components/EventsList';

interface Props {
  events: ServerPublicEvent[];
}

const FrontPage = ({ events: serverEvents }: Props) => {
  const events = serverEvents.map(serverEvent => ({
    ...serverEvent,
    start: new Date(serverEvent.start),
    end: new Date(serverEvent.end),
  })) as PublicEvent[];

  return (
    <Page title="Кочерга" wide>
      <WorkInProgress />
      <PageTitle>Кочерга</PageTitle>
      <EventsList events={events} />
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }) => {
  const from_date = new Date();
  const events = await api.call(
    `public_events?from_date=${formatDate(from_date, 'yyyy-MM-dd')}`,
    'GET'
  );

  return { events };
};

const screen: Screen<Props> = {
  component: FrontPage,
  getInitialData,
};

export default screen;

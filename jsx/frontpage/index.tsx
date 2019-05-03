import React from 'react';

import styled from 'styled-components';

import { utcToZonedTime } from 'date-fns-tz';

import { Column, Row } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '../common/types';
import { timezone, formatDate } from '../common/utils';

import Page from '../components/Page';
import PageTitle from '../components/PageTitle';

import { PublicEvent } from '../events/types';

interface Props {
  events: PublicEvent[];
}

const EventCard = ({ event }: { event: PublicEvent }) => {
  const zonedStart = utcToZonedTime(event.start, timezone);

  return (
    <div>
      <Row>
        <a href={`/event/${event.event_id}/`}>{event.title}</a>
        <div>{formatDate(zonedStart, 'd MMMM, HH:mm')}</div>
      </Row>
      <div>{event.summary}</div>
    </div>
  );
};

const EventsList = ({ events }: Props) => {
  return (
    <Column stretch>
      {events.length && <h2>Ближайшие события:</h2>}
      {events.map(event => <EventCard key={event.event_id} event={event} />)}
    </Column>
  );
};

const FrontPage = ({ events }: Props) => {
  return (
    <Page title="Кочерга">
      <Column gutter={20} stretch>
        <PageTitle>Кочерга</PageTitle>
        <EventsList events={events} />
      </Column>
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

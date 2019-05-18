import React from 'react';

import styled from 'styled-components';

import { utcToZonedTime } from 'date-fns-tz';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '../../common/types';
import { timezone, formatDate } from '../../common/utils';
import { APIError } from '../../common/api';

import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';

import { PublicEvent, EventTicket } from '../types';

import EventAnnouncements from './components/EventAnnouncements';
import Registration from './components/Registration';

export interface Props {
  event: PublicEvent;
  ticket?: EventTicket;
}

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Summary = styled.div`
  font-size: 1.3em;
  line-height: 1.4;
  margin-bottom: 20px;
`;

const TimingsContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  color: #666;
`;

const EventTimings = ({ event }: { event: PublicEvent }) => {
  const zonedStart = utcToZonedTime(event.start, timezone);
  const zonedEnd = utcToZonedTime(event.end, timezone);

  return (
    <TimingsContainer>
      {formatDate(zonedStart, 'd MMMM yyyy, HH:mm')}–
      {formatDate(zonedEnd, 'HH:mm')}
    </TimingsContainer>
  );
};

const EventPage = (props: Props) => {
  const { event } = props;

  const zonedStart = utcToZonedTime(event.start, timezone);
  const title = `${event.title} - ${formatDate(zonedStart, 'd MMMM')}`;

  return (
    <Page title={title}>
      <Page.Title>{event.title}</Page.Title>
      <Page.Main>
        <Column gutter={20} stretch>
          <div>
            <EventTimings event={event} />
            <EventAnnouncements event={event} />
          </div>
          {event.image && <Image src={event.image} />}
          <Summary>{event.summary}</Summary>
          <Markdown source={event.description} plugins={[breaks]} />
          <Registration {...props} />
        </Column>
      </Page.Main>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async (
  { api, user },
  { params }
) => {
  const event = await api.call(`public_events/${params.id}`, 'GET');
  event.start = new Date(event.start);
  event.end = new Date(event.end);

  const result: Props = { event };
  if (user.is_authenticated) {
    try {
      const ticket = await api.call(`events/${params.id}/tickets/my`, 'GET'); // FIXME - can return 404
      result.ticket = ticket;
    } catch (e) {
      if (e instanceof APIError && e.status === 404) {
        // that's ok, user is not registered yet
      } else {
        throw e;
      }
    }
  }

  return result;
};

const screen: Screen<Props> = {
  component: EventPage,
  getInitialData,
};

export default screen;

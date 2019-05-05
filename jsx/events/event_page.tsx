import React from 'react';

import styled from 'styled-components';

import { utcToZonedTime } from 'date-fns-tz';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '../common/types';
import { timezone, formatDate } from '../common/utils';

import Page from '../components/Page';
import PageTitle from '../components/PageTitle';

import { AnnouncementKey, PublicEvent } from './types';

interface Props {
  event: PublicEvent;
}

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Summary = styled.div`
  font-size: 1.2em;
`;

const TimingsContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  color: #999;
`;

const EventTimings = ({ event }: { event: PublicEvent }) => {
  const zonedStart = utcToZonedTime(event.start, timezone);
  const zonedEnd = utcToZonedTime(event.end, timezone);

  return (
    <TimingsContainer>
      {formatDate(zonedStart, 'yyyy-MM-dd HH:mm')}–
      {formatDate(zonedEnd, 'HH:mm')}
    </TimingsContainer>
  );
};

const AnnouncementsContainer = styled.div`
  text-align: center;
  > *:not(:last-child):after {
    content: ' \00b7 ';
  }
`;

const EventAnnouncements = ({ event }: { event: PublicEvent }) => {
  return (
    <AnnouncementsContainer>
      {(['vk', 'fb', 'timepad'] as AnnouncementKey[])
        .filter(key => event.announcements[key])
        .map(key => (
          <span>
            {' '}
            <a href={event.announcements[key].link}>{key}</a>
          </span>
        ))}
    </AnnouncementsContainer>
  );
};

const EventPage = ({ event }: Props) => {
  return (
    <Page title="Страница события">
      <Column gutter={20} stretch>
        <div>
          <PageTitle>{event.title}</PageTitle>
          <EventTimings event={event} />
          <EventAnnouncements event={event} />
        </div>
        {event.image && <Image src={event.image} />}
        <Summary>{event.summary}</Summary>
        <hr />
        <Markdown source={event.description} plugins={[breaks]} />
      </Column>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  const event = await api.call(`public_events/${params.id}`, 'GET');
  event.start = new Date(event.start);
  event.end = new Date(event.end);
  return { event };
};

const screen: Screen<Props> = {
  component: EventPage,
  getInitialData,
};

export default screen;

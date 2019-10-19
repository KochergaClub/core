import React from 'react';
import styled from 'styled-components';

import { utcToZonedTime } from 'date-fns-tz';

import { timezone, formatDate } from '~/common/utils';

import { PublicEvent } from '../../types';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 24px;
  margin: 0;
  padding: 0;
`;

const TitleLink = styled.a`
  color: black;
`;

const Time = styled.time`
  display: block;
  font-weight: bold;
  font-style: italic;
`;

interface Props {
  event: PublicEvent;
  mode?: 'timepad';
}

const EventCard: React.FC<Props> = ({ event, mode }) => {
  const zonedStart = utcToZonedTime(event.start, timezone);

  let href = `/event/${event.event_id}/`;

  if (mode === 'timepad') {
    if (!event.announcements.timepad || !event.announcements.timepad.link) {
      href = '';
    } else {
      href = event.announcements.timepad.link;
    }
  }

  const title = (
    <Title>
      {href ? <TitleLink href={href}>{event.title}</TitleLink> : event.title}
    </Title>
  );

  return (
    <Container>
      {title}
      <Time dateTime={event.start.toISOString()}>
        {formatDate(zonedStart, 'EEEE, d MMMM, HH:mm')}
      </Time>
      <div>{event.summary}</div>
    </Container>
  );
};

export default EventCard;

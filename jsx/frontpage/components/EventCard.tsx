import React from 'react';
import styled from 'styled-components';

import { utcToZonedTime } from 'date-fns-tz';

import { timezone, formatDate } from '~/common/utils';

import { PublicEvent } from '../../events/types';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.a`
  color: black;
  font-size: 24px;
`;

const Time = styled.time`
  display: block;
  font-weight: bold;
  font-style: italic;
`;

const EventCard = ({ event }: { event: PublicEvent }) => {
  const zonedStart = utcToZonedTime(event.start, timezone);

  return (
    <Container>
      <Title href={`/event/${event.event_id}/`}>{event.title}</Title>
      <Time dateTime={event.start.toISOString()}>
        {formatDate(zonedStart, 'd MMMM, HH:mm')}
      </Time>
      <div>{event.summary}</div>
    </Container>
  );
};

export default EventCard;

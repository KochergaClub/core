import React from 'react';
import styled from 'styled-components';

import HumanizedDateTime from '~/components/HumanizedDateTime';

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

const TimeWrapper = styled.div`
  font-weight: bold;
  font-style: italic;
`;

interface Props {
  event: PublicEvent;
  mode?: 'timepad';
}

const EventCard: React.FC<Props> = ({ event, mode }) => {
  let href = `/events/${event.event_id}/`;

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
      <TimeWrapper>
        <HumanizedDateTime date={event.start} />
      </TimeWrapper>
      <div>{event.summary}</div>
    </Container>
  );
};

export default EventCard;

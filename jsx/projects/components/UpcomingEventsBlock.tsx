import React from 'react';

import styled from 'styled-components';

import { ProjectPageType } from '../utils';

import { PublicEvent } from '~/events/types';
import EventsList from '~/events/components/EventsList';

const Container = styled.section`
  padding: 40px 20px;
  margin: 0 auto;
  max-width: 800px;
`;

const UpcomingEventsBlock: React.FC<{ project: ProjectPageType }> = ({
  project,
}) => {
  if (!project.upcoming_events || !project.upcoming_events.length) {
    return null;
  }

  const events = project.upcoming_events.map(serverEvent => ({
    ...serverEvent,
    start: new Date(serverEvent.start),
    end: new Date(serverEvent.end),
  })) as PublicEvent[];

  return (
    <Container>
      <h2>Ближайшие события:</h2>
      <EventsList events={events} mode="timepad" />
    </Container>
  );
};

export default UpcomingEventsBlock;

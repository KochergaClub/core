import * as React from 'react';

import styled from 'styled-components';

import { Event } from '../types';

const EventTitle = styled.div`
  font-weight: bold;
  font-size: 0.9em;
`;

const EventRoom = styled.small``;

const CalendarEvent = ({ event }: { event: Event }) => {
  return (
    <div>
      <EventTitle>{event.title}</EventTitle>
      <EventRoom>{event.room}</EventRoom>
    </div>
  );
};
export default CalendarEvent;

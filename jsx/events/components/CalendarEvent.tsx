import React from 'react';

import styled from 'styled-components';

import { EventProps } from 'react-big-calendar';

import { Event } from '../types';

const EventTitle = styled.div`
  font-weight: bold;
  font-size: 0.9em;
`;

const EventRoom = styled.small``;

const CalendarEvent = ({ event }: EventProps<Event>) => {
  return (
    <div>
      <EventTitle>{event.title}</EventTitle>
      <EventRoom>{event.room}</EventRoom>
    </div>
  );
};
export default CalendarEvent;

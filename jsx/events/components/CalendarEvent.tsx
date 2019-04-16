import * as React from 'react';

import { Event } from '../types';

const CalendarEvent = ({ event }: { event: Event }) => {
  return (
    <div>
      <div>{event.title}</div>
      <small>{event.room}</small>
    </div>
  );
};
export default CalendarEvent;

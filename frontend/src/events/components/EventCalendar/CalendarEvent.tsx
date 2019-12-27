import styled from 'styled-components';

import { EventProps } from 'react-big-calendar';

import { LocalEventWithMetadata } from '../../types';

const EventTitle = styled.div`
  font-weight: bold;
  font-size: 0.9em;
`;

const EventRoom = styled.small``;

const CalendarEvent = ({
  event: eventWithMetadata,
}: EventProps<LocalEventWithMetadata>) => {
  return (
    <div>
      <EventTitle>{eventWithMetadata.event.title}</EventTitle>
      <EventRoom>{eventWithMetadata.event.room}</EventRoom>
    </div>
  );
};
export default CalendarEvent;

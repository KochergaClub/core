import { EventProps } from 'react-big-calendar';

import { LocalEventWithMetadata } from '../../types';

const CalendarEvent = ({
  event: eventWithMetadata,
}: EventProps<LocalEventWithMetadata>) => {
  return (
    <div>
      <div className="font-bold text-xs leading-none">
        {eventWithMetadata.event.title}
      </div>
      <small>{eventWithMetadata.event.room}</small>
    </div>
  );
};
export default CalendarEvent;

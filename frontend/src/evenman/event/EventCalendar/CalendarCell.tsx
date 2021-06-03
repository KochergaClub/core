import Router from 'next/router';
import React, { useCallback } from 'react';

import { evenmanEventRoute } from '../../routes';
import EventCalendarItem from '../EventCalendarItem';
import { ProjectionCalendarItem } from '../ProjectionCalendarItem';
import { EventsEvent_SummaryFragment } from '../queries.generated';
import { Projection } from './projection';

type Props = {
  events: EventsEvent_SummaryFragment[];
  projections: Projection[];
  selected_id?: string;
};

export const CalendarCell: React.FC<Props> = ({
  events,
  projections,
  selected_id,
}) => {
  const selectCb = useCallback((id: string) => {
    Router.push(evenmanEventRoute(id));
  }, []);

  return (
    <div className="w-full overflow-auto whitespace-nowrap">
      {events.map((event) => (
        <EventCalendarItem
          key={event.id}
          event={event}
          selected={event.id === selected_id}
          onSelect={selectCb}
        />
      ))}
      {projections.map((projection) => (
        <ProjectionCalendarItem
          key={`${projection.prototype.id}-${projection.date}`}
          projection={projection}
        />
      ))}
    </div>
  );
};

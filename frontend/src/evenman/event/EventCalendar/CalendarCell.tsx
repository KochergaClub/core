import { useCallback } from 'react';

import styled from 'styled-components';

import Router from 'next/router';

import EventCalendarItem from '../EventCalendarItem';

import { EventsEvent_SummaryFragment } from '../queries.generated';

import { eventRoute } from '../../routes';

const CalendarCellContainer = styled.div`
  height: 3em;
  overflow: scroll;
`;

interface Props {
  events: EventsEvent_SummaryFragment[];
  selected_id?: string;
}

const CalendarCell: React.FC<Props> = ({ events, selected_id }) => {
  const selectCb = useCallback((id: string) => {
    const route = eventRoute(id);
    Router.push(route.href, route.as);
  }, []);

  return (
    <CalendarCellContainer>
      {events.map(event => (
        <EventCalendarItem
          key={event.id}
          event={event}
          selected={event.id === selected_id}
          onSelect={selectCb}
        />
      ))}
    </CalendarCellContainer>
  );
};

export default CalendarCell;

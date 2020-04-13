import { useCallback } from 'react';

import styled from 'styled-components';

import Router from 'next/router';

import EventCalendarItem from '../EventCalendarItem';

import { EventsEvent_SummaryFragment } from '../queries.generated';

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
    Router.push('/team/evenman/event/[id]', `/team/evenman/event/${id}`);
  }, []);

  return (
    <CalendarCellContainer>
      {events.map(event => (
        <EventCalendarItem
          key={event.event_id}
          event={event}
          selected={event.event_id === selected_id}
          onSelect={selectCb}
        />
      ))}
    </CalendarCellContainer>
  );
};

export default CalendarCell;

import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';

import Router from 'next/router';

import EventCalendarItem from '../EventCalendarItem';

import { Event } from '../../stores/Event';

const CalendarCellContainer = styled.div`
  height: 3em;
  overflow: scroll;
`;

interface Props {
  events: Event[];
  selected_id?: string;
}

const CalendarCell: React.FC<Props> = observer(({ events, selected_id }) => {
  const selectCb = useCallback((id: string) => {
    Router.push('/team/evenman/event/[id]', `/team/evenman/event/${id}`);
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
});

export default CalendarCell;

import React, { useCallback, useState, useReducer } from 'react';

import moment from 'moment';

import Page from '../components/Page';

import Calendar from './components/Calendar';
import NewEventModal from './components/NewEventModal';

import { PublicEvent, reducer } from './types';
import { EventDispatch } from './contexts';

const startAccessor = (event: PublicEvent) => {
  return new Date(event.start);
};
const endAccessor = (event: PublicEvent) => new Date(event.end);

export default (props: { events: PublicEvent[]; csrfToken: string }) => {
  const [events, dispatch] = useReducer(reducer, props.events);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingStart, setEditingStart] = useState();
  const [editingEnd, setEditingEnd] = useState();

  const newEvent = useCallback(({ start, end }: { start: Date; end: Date }) => {
    setEditingStart(start);
    setEditingEnd(end);
    setModalIsOpen(true);
  }, []);

  const resizeEvent = useCallback(
    ({ event, start, end }: { event: PublicEvent; start: Date; end: Date }) => {
      dispatch({
        type: 'RESIZE',
        payload: { event, start: moment(start), end: moment(end) },
      });
    },
    []
  );

  return (
    <Page title="Календарь событий" team csrfToken={props.csrfToken}>
      <h1>Календарь событий</h1>
      <EventDispatch.Provider value={dispatch}>
        <Calendar
          events={events}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          onSelectSlot={newEvent}
          onEventResize={resizeEvent}
          onEventDrop={resizeEvent}
        />

        {modalIsOpen && (
          <NewEventModal
            isOpen={modalIsOpen}
            start={editingStart}
            end={editingEnd}
            setOpen={setModalIsOpen}
          />
        )}
      </EventDispatch.Provider>
    </Page>
  );
};

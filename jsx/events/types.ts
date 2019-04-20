import moment from 'moment';

export interface Event {
  id: string;
  title: string;
  room: string;
  start: moment.Moment;
  end: moment.Moment;
}

export interface ServerEvent {
  id: string;
  title: string;
  room: string;
  start: string;
  end: string;
}

// Supports client-side state such as event.saving flag.
// We store LocalEvent objects in React state but accept Event objects when interacting with API.
export interface LocalEvent extends Event {
  saving?: boolean;
}

export interface EventStore {
  events: LocalEvent[];
}

export interface CreateAction {
  type: 'CREATE';
  payload: Event;
}

export interface PreResizeAction {
  type: 'PRE_RESIZE';
  payload: {
    event: Event;
    start: moment.Moment;
    end: moment.Moment;
  };
}

export interface ResizeAction {
  type: 'RESIZE';
  payload: {
    event: Event;
    start: moment.Moment;
    end: moment.Moment;
  };
}

export interface PatchAction {
  type: 'PATCH';
  payload: {
    event: Event;
  };
}

export interface ReplaceAllAction {
  type: 'REPLACE_ALL';
  payload: {
    events: Event[];
  };
}

export type Action =
  | CreateAction
  | PreResizeAction
  | ResizeAction
  | PatchAction
  | ReplaceAllAction;

export const serverEventToEvent = (event: ServerEvent): Event => {
  return {
    ...event,
    start: moment(event.start),
    end: moment(event.end),
  };
};

export const getInitialState = (events: ServerEvent[]) => ({
  events: events.map(serverEventToEvent),
});

export const reducer = (store: EventStore, action: Action) => {
  switch (action.type) {
    case 'CREATE':
      return {
        ...store, // FIXME - check that new event fits in range
        events: [
          ...store.events,
          {
            start: action.payload.start,
            end: action.payload.end,
            title: action.payload.title,
            id: action.payload.id,
            room: action.payload.room,
          },
        ],
      };
    case 'PRE_RESIZE':
      return {
        ...store,
        events: store.events.map(existingEvent => {
          return existingEvent.id == action.payload.event.id
            ? {
                ...existingEvent,
                start: action.payload.start,
                end: action.payload.end,
                saving: true,
              }
            : existingEvent;
        }),
      };
    case 'RESIZE':
      return {
        ...store,
        events: store.events.map(existingEvent => {
          return existingEvent.id == action.payload.event.id
            ? {
                ...existingEvent,
                start: action.payload.start,
                end: action.payload.end,
                saving: false,
              }
            : existingEvent;
        }),
      };
    case 'PATCH':
      return {
        ...store,
        events: store.events.map(existingEvent => {
          return existingEvent.id == action.payload.event.id
            ? {
                ...action.payload.event,
                saving: false, // FIXME - race conditions are possible if we get multiple patches out of order
              }
            : existingEvent;
        }),
      };
    case 'REPLACE_ALL':
      return {
        ...store,
        events: action.payload.events,
      };
    default:
      return store;
  }
};

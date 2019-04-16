import moment from 'moment';

export interface Event {
  id: string;
  title: string;
  room: string;
  start: string;
  end: string;
  saving?: boolean;
}

export interface EventStore {
  events: Event[];
}

export interface CreateAction {
  type: 'CREATE';
  payload: {
    start: moment.Moment;
    end: moment.Moment;
    title: string;
    room: string;
    id: string;
  };
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
  | ReplaceAllAction;

export const reducer = (store: EventStore, action: Action) => {
  switch (action.type) {
    case 'CREATE':
      return {
        ...store, // FIXME - check that new event fits in range
        events: [
          ...store.events,
          {
            start: action.payload.start.format(),
            end: action.payload.end.format(),
            title: action.payload.title,
            id: action.payload.id,
            room: 'TODO',
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
                start: action.payload.start.format(),
                end: action.payload.end.format(),
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
                start: action.payload.start.format(),
                end: action.payload.end.format(),
                saving: false,
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

import moment from 'moment';

export interface Event {
  id: string;
  title: string;
  room: string;
  start: string;
  end: string;
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
    id: string;
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

export type Action = CreateAction | ResizeAction | ReplaceAllAction;

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
    case 'RESIZE':
      return {
        ...store,
        events: store.events.map(existingEvent => {
          return existingEvent.id == action.payload.event.id
            ? {
                ...existingEvent,
                start: action.payload.start.format(),
                end: action.payload.end.format(),
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

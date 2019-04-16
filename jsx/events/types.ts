import moment from 'moment';

export interface Event {
  id: string;
  title: string;
  room: string;
  start: string;
  end: string;
}

export type EventStore = Event[];

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

export const reducer = (events: EventStore, action: Action) => {
  switch (action.type) {
    case 'CREATE':
      return [
        ...events,
        {
          start: action.payload.start.format(),
          end: action.payload.end.format(),
          title: action.payload.title,
          id: action.payload.id,
          room: 'TODO',
        },
      ];
    case 'RESIZE':
      return events.map(existingEvent => {
        return existingEvent.id == action.payload.event.id
          ? {
              ...existingEvent,
              start: action.payload.start.format(),
              end: action.payload.end.format(),
            }
          : existingEvent;
      });
    case 'REPLACE_ALL':
      return action.payload.events;
    default:
      return events;
  }
};

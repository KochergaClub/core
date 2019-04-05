import moment from 'moment';

export interface PublicEvent {
  event_id: string;
  title: string;
  room: string;
  start: string;
  end: string;
}

export interface CreateAction {
  type: 'CREATE';
  payload: {
    start: moment.Moment;
    end: moment.Moment;
  };
}

export interface ResizeAction {
  type: 'RESIZE';
  payload: {
    event: PublicEvent;
    start: moment.Moment;
    end: moment.Moment;
  };
}

export type Action = CreateAction | ResizeAction;

export const reducer = (events: PublicEvent[], action: Action) => {
  switch (action.type) {
    case 'CREATE':
      return [
        ...events,
        {
          start: action.payload.start.format(),
          end: action.payload.end.format(),
          event_id: 'TODO',
          title: 'TODO',
          room: 'TODO',
        },
      ];
    case 'RESIZE':
      return events.map(existingEvent => {
        return existingEvent.event_id == action.payload.event.event_id
          ? {
              ...existingEvent,
              start: action.payload.start.format(),
              end: action.payload.end.format(),
            }
          : existingEvent;
      });
    default:
      return events;
  }
};

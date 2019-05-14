export type AnnouncementKey = 'vk' | 'fb' | 'timepad';

export interface PublicEvent {
  event_id: string;
  title: string;
  summary?: string;
  description?: string;
  image: string;
  start: Date;
  end: Date;
  announcements: {
    [key in AnnouncementKey]: {
      link: string;
    }
  };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  room: string;
  start: Date;
  end: Date;
  posted_vk?: string;
  posted_fb?: string;
  posted_timepad?: string;
}

export interface EventTicket {
  id: number;
}

export interface ServerEvent {
  id: string;
  title: string;
  description: string;
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
    start: Date;
    end: Date;
  };
}

export interface PatchAction {
  type: 'PATCH';
  payload: {
    event: Event;
  };
}

export interface DeleteAction {
  type: 'DELETE';
  payload: {
    event_id: string;
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
  | PatchAction
  | DeleteAction
  | ReplaceAllAction;

export const serverEventToEvent = (event: ServerEvent): Event => {
  return {
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
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
        events: [...store.events, action.payload],
      };
    case 'PRE_RESIZE':
      return {
        ...store,
        events: store.events.map(existingEvent => {
          return existingEvent.id === action.payload.event.id
            ? {
                ...existingEvent,
                start: action.payload.start,
                end: action.payload.end,
                saving: true,
              }
            : existingEvent;
        }),
      };
    case 'PATCH':
      return {
        ...store,
        events: store.events.map(existingEvent => {
          return existingEvent.id === action.payload.event.id
            ? {
                ...action.payload.event,
                saving: false, // FIXME - race conditions are possible if we get multiple patches out of order
              }
            : existingEvent;
        }),
      };
    case 'DELETE':
      return {
        ...store,
        events: store.events.filter(event => {
          return event.id !== action.payload.event_id;
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

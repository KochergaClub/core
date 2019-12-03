export type AnnouncementKey = 'vk' | 'fb' | 'timepad';

interface CommonEventProps {
  title: string;
  summary?: string;
  description: string;
  announcements: {
    [key in AnnouncementKey]: {
      link: string;
    };
  };
  registration_type: 'native' | 'timepad';
}

export interface PublicEvent extends CommonEventProps {
  event_id: string;
  image?: string;
  start: Date;
  end: Date;
  project?: number;
}

export interface ServerPublicEvent extends CommonEventProps {
  event_id: string;
  image?: string;
  start: string; // JSON doesn't support Date objects
  end: string;
  project?: number;
}

export interface Event extends CommonEventProps {
  id: string;
  room: string;
  creator?: string;
  start: Date;
  end: Date;
  type: 'public' | 'private' | 'unknown';
}

export interface ServerEvent extends CommonEventProps {
  id: string;
  room: string;
  creator?: string;
  start: string;
  end: string;
  type: 'public' | 'private' | 'unknown';
}

export interface NewEvent {
  title: string;
  description?: string;
  location: string;
  start: Date;
  end: Date;
  type?: 'public' | 'private' | 'unknown';
}

// Supports client-side state such as event.saving flag.
// We store LocalEvent objects in React state but accept Event objects when interacting with API.
export interface LocalEvent extends Event {
  saving?: boolean;
}

export interface CreateFeedbackParams {
  overall_score?: number;
  recommend_score?: number;
  content_score?: number;
  conductor_score?: number;
  source?: string;
  custom_source?: string;
  comment?: string;
}

export interface Feedback extends CreateFeedbackParams {
  id: number;
}

export interface EventTicket {
  id: number;
  user: string; // email
  status: string; // 'ok' | 'cancelled'
}

export interface EventTicketIdsList {
  id: string;
  ticket_ids: number[];
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

export const serverPublicEventToEvent = (
  event: ServerPublicEvent
): PublicEvent => {
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

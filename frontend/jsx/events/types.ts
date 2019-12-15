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
  pricing_type: 'anticafe' | 'free';
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

export type ServerEventPatch = Omit<Partial<ServerEvent>, 'id' | 'room'> & {
  location?: string;
};

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

export interface LocalEventWithMetadata {
  event: Event;
  saving: boolean;
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

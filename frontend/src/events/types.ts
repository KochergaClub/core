import { parseISO } from 'date-fns';

import { TeamCalendarEventFragment } from './queries.generated';

// export type AnnouncementKey = 'vk' | 'fb' | 'timepad';
// 
// interface CommonEventProps {
//   title: string;
//   summary?: string;
//   description: string;
//   announcements: {
//     [key in AnnouncementKey]: {
//       link: string;
//     };
//   };
//   registration_type: 'native' | 'timepad';
//   pricing_type: 'anticafe' | 'free';
// }
// 
// export interface Event extends CommonEventProps {
//   id: string;
//   room: string;
//   creator?: string;
//   start: Date;
//   end: Date;
//   type: 'public' | 'private' | 'unknown';
// }
// 
// export type ServerEventPatch = Omit<Partial<ServerEvent>, 'id' | 'room'> & {
//   location?: string;
// };
// 
// export interface ServerEvent extends CommonEventProps {
//   id: string;
//   room: string;
//   creator?: string;
//   start: string;
//   end: string;
//   type: 'public' | 'private' | 'unknown';
// }
// 
// export interface NewEvent {
//   title: string;
//   description?: string;
//   location: string;
//   start: Date;
//   end: Date;
//   type?: 'public' | 'private' | 'unknown';
// }

export interface LocalEventWithMetadata {
  event: TeamCalendarEventFragment;
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

// export const serverEventToEvent = (event: ServerEvent): Event => {
//   return {
//     ...event,
//     start: parseISO(event.start),
//     end: parseISO(event.end),
//   };
// };

import { TeamCalendarEventFragment } from './queries.generated';

export interface LocalEventWithMetadata {
  event: TeamCalendarEventFragment;
  saving: boolean;
}

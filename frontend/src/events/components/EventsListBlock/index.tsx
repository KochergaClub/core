import { PaddedBlock } from '~/components';

import { Event_SummaryFragment } from '../../queries.generated';
import EventCard from './EventCard';

interface Props {
  events: Event_SummaryFragment[];
}

export default function EventsListBlock({ events }: Props) {
  return (
    <PaddedBlock>
      {events.length ? (
        <div className="space-y-10">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div>Ни одного события не запланировано.</div>
      )}
    </PaddedBlock>
  );
}

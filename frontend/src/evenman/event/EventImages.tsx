import { Row } from '@kocherga/frontkit';

import EventImageWidgetDefault from './EventImageWidgetDefault';
import EventImageWidgetVk from './EventImageWidgetVk';
import { EvenmanEvent_DetailsFragment } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventImages: React.FC<Props> = ({ event }) => {
  if (event.event_type !== 'public') return null;

  return (
    <Row centered gutter={12}>
      <EventImageWidgetDefault event={event} />
      <EventImageWidgetVk event={event} />
    </Row>
  );
};

export default EventImages;

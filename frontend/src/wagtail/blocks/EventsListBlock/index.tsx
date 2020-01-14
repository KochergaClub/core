import { EventsListBlockFragment as Props } from '../fragments.generated';

import NonWagtailEventsListBlock from '~/events/components/EventsListBlock';

export default function EventsListBlock(props: Props) {
  return <NonWagtailEventsListBlock events={props.events} />;
}

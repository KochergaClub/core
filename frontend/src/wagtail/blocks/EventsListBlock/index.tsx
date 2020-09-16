import dynamic from 'next/dynamic';

import { gql } from '@apollo/client';

import NonWagtailEventsListBlock from '~/events/components/EventsListBlock';
import { BlockComponent } from '~/wagtail/types';

import { EventsListBlockFragment as Props, EventsListBlockFragmentDoc } from './index.generated';

const PublicEventsCalendar = dynamic(
  () => import('~/events/components/PublicEventsCalendar'),
  { ssr: false }
);

const EventsListBlock: BlockComponent<Props> = (props) => {
  return (
    <div>
      <PublicEventsCalendar />
      <NonWagtailEventsListBlock events={props.events} />
    </div>
  );
};

gql`
  fragment EventsListBlock on EventsListBlock {
    id
    events {
      ...Event_Summary
    }
  }
`;

// This fragment embeds Event_Summary fragment.
// This is important because we call a dynamic graphql query in blocks editor.
EventsListBlock.fragment = EventsListBlockFragmentDoc;

export default EventsListBlock;

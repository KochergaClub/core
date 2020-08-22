import { gql } from '@apollo/client';

import NonWagtailEventsListBlock from '~/events/components/EventsListBlock';
import { BlockComponent } from '~/wagtail/types';

import { EventsListBlockFragment as Props } from './index.generated';

const EventsListBlock: BlockComponent<Props> = (props) => {
  return <NonWagtailEventsListBlock events={props.events} />;
};

EventsListBlock.fragment = gql`
  fragment EventsListBlock on EventsListBlock {
    id
    events {
      ...Event_Summary
    }
  }
`;

export default EventsListBlock;

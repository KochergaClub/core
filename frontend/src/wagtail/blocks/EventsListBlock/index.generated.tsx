import * as Types from '../../../apollo/types.generated';

import { Event_SummaryFragment } from '../../../events/queries.generated';
import gql from 'graphql-tag';
import { Event_SummaryFragmentDoc } from '../../../events/queries.generated';

export type EventsListBlockFragment = (
  { __typename: 'EventsListBlock' }
  & Pick<Types.EventsListBlock, 'id'>
  & { events: Array<(
    { __typename: 'Event' }
    & Event_SummaryFragment
  )> }
);

export const EventsListBlockFragmentDoc = gql`
    fragment EventsListBlock on EventsListBlock {
  id
  events {
    ...Event_Summary
  }
}
    ${Event_SummaryFragmentDoc}`;
import * as Types from '../../../apollo/types.generated';

import { Event_SummaryFragment } from '../../../events/queries.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { Event_SummaryFragmentDoc } from '../../../events/queries.generated';
export type EventsListBlockFragment = (
  { __typename: 'EventsListBlock' }
  & Pick<Types.EventsListBlock, 'id'>
  & { events: Array<(
    { __typename: 'Event' }
    & Event_SummaryFragment
  )> }
);

export const EventsListBlockFragmentDoc: DocumentNode<EventsListBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventsListBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventsListBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event_Summary"},"directives":[]}]}}]}},...Event_SummaryFragmentDoc.definitions]};
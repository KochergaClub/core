import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type NowFragment = (
  { __typename: 'NowInfo' }
  & Pick<Types.NowInfo, 'total'>
  & { customers: Array<(
    { __typename: 'NowCustomer' }
    & Pick<Types.NowCustomer, 'first_name' | 'last_name'>
  )> }
);

export type NowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type NowQuery = (
  { __typename: 'Query' }
  & { now: (
    { __typename: 'NowInfo' }
    & NowFragment
  ) }
);

export const NowFragmentDoc: DocumentNode<NowFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Now"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NowInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"customers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}}]}}]};
export const NowDocument: DocumentNode<NowQuery, NowQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Now" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "now" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Now" } }] } }] } }, ...NowFragmentDoc.definitions] });

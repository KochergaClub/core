import * as Types from '../apollo/types.generated';

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

export const NowFragmentDoc: DocumentNode<NowFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Now"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NowInfo"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"customers"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"last_name"},"arguments":[],"directives":[]}]}}]}}]};
export const NowDocument: DocumentNode<NowQuery, NowQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Now"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"now"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Now"},"directives":[]}]}}]}},...NowFragmentDoc.definitions]};
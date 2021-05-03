import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AnalyticsBovStatFragment = (
  { __typename: 'AnalyticsBovStat' }
  & Pick<Types.AnalyticsBovStat, 'date' | 'count' | 'total_income'>
);

export type AnalyticsBovStatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AnalyticsBovStatsQuery = (
  { __typename: 'Query' }
  & { bovStats: Array<(
    { __typename: 'AnalyticsBovStat' }
    & AnalyticsBovStatFragment
  )> }
);

export type AnalyticsUpdateFbRatioAudienceMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type AnalyticsUpdateFbRatioAudienceMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export const AnalyticsBovStatFragmentDoc: DocumentNode<AnalyticsBovStatFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnalyticsBovStat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnalyticsBovStat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"total_income"}}]}}]};
export const AnalyticsBovStatsDocument: DocumentNode<AnalyticsBovStatsQuery, AnalyticsBovStatsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "AnalyticsBovStats" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "bovStats" }, "name": { "kind": "Name", "value": "analyticsBovStats" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "AnalyticsBovStat" } }] } }] } }, ...AnalyticsBovStatFragmentDoc.definitions] });

export const AnalyticsUpdateFbRatioAudienceDocument: DocumentNode<AnalyticsUpdateFbRatioAudienceMutation, AnalyticsUpdateFbRatioAudienceMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AnalyticsUpdateFbRatioAudience" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "fbMarketingAudienceUploadRatioTickets" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }] } }] });

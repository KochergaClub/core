import * as Types from '../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CommonZadarmaPbxCallFragment = (
  { __typename: 'ZadarmaPbxCall' }
  & Pick<Types.ZadarmaPbxCall, 'id' | 'ts'>
  & { calls: Array<(
    { __typename: 'ZadarmaCall' }
    & Pick<Types.ZadarmaCall, 'id' | 'ts' | 'call_type' | 'destination' | 'disposition' | 'clid' | 'sip' | 'record' | 'watchman'>
  )>, data?: Types.Maybe<(
    { __typename: 'ZadarmaData' }
    & { staff_member?: Types.Maybe<(
      { __typename: 'StaffMember' }
      & Pick<Types.StaffMember, 'id' | 'color' | 'short_name'>
    )> }
  )> }
);

export type ZadarmaPbxCallsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type ZadarmaPbxCallsQuery = (
  { __typename: 'Query' }
  & { pbxCalls: (
    { __typename: 'ZadarmaPbxCallConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<(
      { __typename: 'ZadarmaPbxCallEdge' }
      & { node: (
        { __typename: 'ZadarmaPbxCall' }
        & CommonZadarmaPbxCallFragment
      ) }
    )> }
  ) }
);

export type ZadarmaPbxCallQueryVariables = Types.Exact<{
  pbx_call_id: Types.Scalars['ID'];
}>;


export type ZadarmaPbxCallQuery = (
  { __typename: 'Query' }
  & { pbxCall: (
    { __typename: 'ZadarmaPbxCall' }
    & CommonZadarmaPbxCallFragment
  ) }
);

export type ZadarmaSetMemberForPbxCallMutationVariables = Types.Exact<{
  member_id: Types.Scalars['ID'];
  pbx_call_id: Types.Scalars['ID'];
}>;


export type ZadarmaSetMemberForPbxCallMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'zadarmaSetMemberForPbxCall'>
);

export const CommonZadarmaPbxCallFragmentDoc: DocumentNode<CommonZadarmaPbxCallFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommonZadarmaPbxCall"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ZadarmaPbxCall"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ts"}},{"kind":"Field","name":{"kind":"Name","value":"calls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ts"}},{"kind":"Field","name":{"kind":"Name","value":"call_type"}},{"kind":"Field","name":{"kind":"Name","value":"destination"}},{"kind":"Field","name":{"kind":"Name","value":"disposition"}},{"kind":"Field","name":{"kind":"Name","value":"clid"}},{"kind":"Field","name":{"kind":"Name","value":"sip"}},{"kind":"Field","name":{"kind":"Name","value":"record"}},{"kind":"Field","name":{"kind":"Name","value":"watchman"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"staff_member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"short_name"}}]}}]}}]}}]};
export const ZadarmaPbxCallsDocument: DocumentNode<ZadarmaPbxCallsQuery, ZadarmaPbxCallsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ZadarmaPbxCalls"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"pbxCalls"},"name":{"kind":"Name","value":"zadarmaPbxCalls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonZadarmaPbxCall"}}]}}]}}]}}]}},...CommonZadarmaPbxCallFragmentDoc.definitions]};
export const ZadarmaPbxCallDocument: DocumentNode<ZadarmaPbxCallQuery, ZadarmaPbxCallQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ZadarmaPbxCall"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pbx_call_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"pbxCall"},"name":{"kind":"Name","value":"zadarmaPbxCall"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pbx_call_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pbx_call_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonZadarmaPbxCall"}}]}}]}},...CommonZadarmaPbxCallFragmentDoc.definitions]};
export const ZadarmaSetMemberForPbxCallDocument: DocumentNode<ZadarmaSetMemberForPbxCallMutation, ZadarmaSetMemberForPbxCallMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ZadarmaSetMemberForPbxCall"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"member_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pbx_call_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zadarmaSetMemberForPbxCall"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"member_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"member_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pbx_call_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pbx_call_id"}}}]}]}}]};
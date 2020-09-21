import * as Types from '../../../../apollo/types.generated';

import { WagtailImage_ForEditorFragment } from '../../../images/ImageEditor/fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { WagtailImage_ForEditorFragmentDoc } from '../../../images/ImageEditor/fragments.generated';
export type WagtailImageQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type WagtailImageQuery = (
  { __typename: 'Query' }
  & { result?: Types.Maybe<(
    { __typename: 'WagtailImage' }
    & WagtailImage_ForEditorFragment
  )> }
);


export const WagtailImageDocument: DocumentNode<WagtailImageQuery, WagtailImageQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WagtailImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"wagtailImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailImage_ForEditor"},"directives":[]}]}}]}},...WagtailImage_ForEditorFragmentDoc.definitions]};
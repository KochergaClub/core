import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type TemplateFragment = (
  { __typename: 'ImageTemplate' }
  & Pick<Types.ImageTemplate, 'name'>
  & { schema: (
    { __typename: 'ImageTemplateSchema' }
    & { fields: Array<(
      { __typename: 'ImageTemplateSchemaField' }
      & Pick<Types.ImageTemplateSchemaField, 'name' | 'type' | 'default'>
    )> }
  ), sizes: (
    { __typename: 'ImageTemplateSizes' }
    & Pick<Types.ImageTemplateSizes, 'width' | 'height'>
  ) }
);

export type ImageTemplatesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ImageTemplatesQuery = (
  { __typename: 'Query' }
  & { templates: Array<(
    { __typename: 'ImageTemplate' }
    & TemplateFragment
  )> }
);

export type ImageTemplateBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type ImageTemplateBySlugQuery = (
  { __typename: 'Query' }
  & { template: (
    { __typename: 'ImageTemplate' }
    & TemplateFragment
  ) }
);

export const TemplateFragmentDoc: DocumentNode<TemplateFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Template"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageTemplate"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"schema"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fields"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"default"},"arguments":[],"directives":[]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"height"},"arguments":[],"directives":[]}]}}]}}]};
export const ImageTemplatesDocument: DocumentNode<ImageTemplatesQuery, ImageTemplatesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "ImageTemplates" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "templates" }, "name": { "kind": "Name", "value": "imageTemplatesAll" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Template" }, "directives": [] }] } }] } }, ...TemplateFragmentDoc.definitions] });

export const ImageTemplateBySlugDocument: DocumentNode<ImageTemplateBySlugQuery, ImageTemplateBySlugQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "ImageTemplateBySlug" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "template" }, "name": { "kind": "Name", "value": "imageTemplateBySlug" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "slug" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Template" }, "directives": [] }] } }] } }, ...TemplateFragmentDoc.definitions] });

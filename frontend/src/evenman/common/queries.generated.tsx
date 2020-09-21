import * as Types from '../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type EvenmanProjectsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanProjectsListQuery = (
  { __typename: 'Query' }
  & { projects: Array<(
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'slug'>
    ) }
  )> }
);

export type EvenmanVkGroupsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanVkGroupsQuery = (
  { __typename: 'Query' }
  & { vkGroups: Array<(
    { __typename: 'VkGroup' }
    & Pick<Types.VkGroup, 'name'>
  )> }
);

export type EvenmanTimepadCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanTimepadCategoriesQuery = (
  { __typename: 'Query' }
  & { timepadCategories: Array<(
    { __typename: 'TimepadCategory' }
    & Pick<Types.TimepadCategory, 'id' | 'code' | 'name'>
  )> }
);


export const EvenmanProjectsListDocument: DocumentNode<EvenmanProjectsListQuery, EvenmanProjectsListQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvenmanProjectsList"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"meta"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const EvenmanVkGroupsDocument: DocumentNode<EvenmanVkGroupsQuery, EvenmanVkGroupsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvenmanVkGroups"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vkGroups"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};
export const EvenmanTimepadCategoriesDocument: DocumentNode<EvenmanTimepadCategoriesQuery, EvenmanTimepadCategoriesQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvenmanTimepadCategories"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timepadCategories"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"code"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};
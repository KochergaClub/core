import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PageSearchItemFragment = (
  { __typename: 'PageSearchItem' }
  & { page: (
    { __typename: 'BlogIndexPage' }
    & Pick<Types.BlogIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'BlogPostPage' }
    & Pick<Types.BlogPostPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'FaqPage' }
    & Pick<Types.FaqPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'FolderPage' }
    & Pick<Types.FolderPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'FreeFormPage' }
    & Pick<Types.FreeFormPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'PresentationPage' }
    & Pick<Types.PresentationPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'ProjectIndexPage' }
    & Pick<Types.ProjectIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioNotebookIndexPage' }
    & Pick<Types.RatioNotebookIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioNotebookPage' }
    & Pick<Types.RatioNotebookPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioPresentationIndexPage' }
    & Pick<Types.RatioPresentationIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioSectionIndexPage' }
    & Pick<Types.RatioSectionIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioSectionPage' }
    & Pick<Types.RatioSectionPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) }
);

export type EventSearchItemFragment = (
  { __typename: 'EventSearchItem' }
  & { event: (
    { __typename: 'Event' }
    & Pick<Types.Event, 'id' | 'title' | 'start'>
  ) }
);

export type SearchQueryVariables = Types.Exact<{
  input: Types.SearchInput;
}>;


export type SearchQuery = (
  { __typename: 'Query' }
  & { search: (
    { __typename: 'SearchResult' }
    & Pick<Types.SearchResult, 'more'>
    & { results: Array<(
      { __typename: 'PageSearchItem' }
      & PageSearchItemFragment
    ) | (
      { __typename: 'EventSearchItem' }
      & EventSearchItemFragment
    )> }
  ) }
);

export const PageSearchItemFragmentDoc: DocumentNode<PageSearchItemFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageSearchItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageSearchItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]};
export const EventSearchItemFragmentDoc: DocumentNode<EventSearchItemFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventSearchItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventSearchItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start"}}]}}]}}]};
export const SearchDocument: DocumentNode<SearchQuery, SearchQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Search" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "SearchInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "search" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "PageSearchItem" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EventSearchItem" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "more" } }] } }] } }, ...PageSearchItemFragmentDoc.definitions, ...EventSearchItemFragmentDoc.definitions] });

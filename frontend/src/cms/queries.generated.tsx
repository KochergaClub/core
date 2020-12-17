import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type WagtailPageTypeQueryVariables = Types.Exact<{
  path?: Types.Maybe<Types.Scalars['String']>;
  preview_token?: Types.Maybe<Types.Scalars['String']>;
}>;


export type WagtailPageTypeQuery = (
  { __typename: 'Query' }
  & { result: (
    { __typename: 'WagtailPageContainer' }
    & { page?: Types.Maybe<(
      { __typename: 'BlogIndexPage' }
      & Pick<Types.BlogIndexPage, 'id'>
    ) | (
      { __typename: 'BlogPostPage' }
      & Pick<Types.BlogPostPage, 'id'>
    ) | (
      { __typename: 'FaqPage' }
      & Pick<Types.FaqPage, 'id'>
    ) | (
      { __typename: 'FolderPage' }
      & Pick<Types.FolderPage, 'id'>
    ) | (
      { __typename: 'FreeFormPage' }
      & Pick<Types.FreeFormPage, 'id'>
    ) | (
      { __typename: 'PresentationPage' }
      & Pick<Types.PresentationPage, 'id'>
    ) | (
      { __typename: 'ProjectIndexPage' }
      & Pick<Types.ProjectIndexPage, 'id'>
    ) | (
      { __typename: 'ProjectPage' }
      & Pick<Types.ProjectPage, 'id'>
    ) | (
      { __typename: 'RatioNotebookIndexPage' }
      & Pick<Types.RatioNotebookIndexPage, 'id'>
    ) | (
      { __typename: 'RatioNotebookPage' }
      & Pick<Types.RatioNotebookPage, 'id'>
    ) | (
      { __typename: 'RatioPresentationIndexPage' }
      & Pick<Types.RatioPresentationIndexPage, 'id'>
    ) | (
      { __typename: 'RatioSectionIndexPage' }
      & Pick<Types.RatioSectionIndexPage, 'id'>
    ) | (
      { __typename: 'RatioSectionPage' }
      & Pick<Types.RatioSectionPage, 'id'>
    )> }
  ) | (
    { __typename: 'WagtailPagePrivate' }
    & Pick<Types.WagtailPagePrivate, 'message'>
  ) }
);

export type TildaPageQueryVariables = Types.Exact<{
  path: Types.Scalars['String'];
}>;


export type TildaPageQuery = (
  { __typename: 'Query' }
  & { tildaPage?: Types.Maybe<(
    { __typename: 'TildaPage' }
    & Pick<Types.TildaPage, 'id' | 'body' | 'title' | 'description' | 'show_header_and_footer'>
    & { og_image?: Types.Maybe<(
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'url'>
    )>, vk_image?: Types.Maybe<(
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'url'>
    )>, css: Array<(
      { __typename: 'TildaAsset' }
      & Pick<Types.TildaAsset, 'url'>
    )>, js: Array<(
      { __typename: 'TildaAsset' }
      & Pick<Types.TildaAsset, 'url'>
    )> }
  )> }
);

export type TildaPagesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TildaPagesQuery = (
  { __typename: 'Query' }
  & { tildaPages: Array<(
    { __typename: 'TildaPage' }
    & Pick<Types.TildaPage, 'path'>
  )> }
);

export type WagtailPagesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WagtailPagesQuery = (
  { __typename: 'Query' }
  & { wagtailPages: Array<(
    { __typename: 'BlogIndexPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'BlogPostPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'FaqPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'FolderPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'FreeFormPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'PresentationPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'ProjectIndexPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'ProjectPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioNotebookIndexPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioNotebookPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioPresentationIndexPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioSectionIndexPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  ) | (
    { __typename: 'RatioSectionPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  )> }
);

export type CommonWagtailPage_BlogIndexPage_Fragment = (
  { __typename: 'BlogIndexPage' }
  & Pick<Types.BlogIndexPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_BlogPostPage_Fragment = (
  { __typename: 'BlogPostPage' }
  & Pick<Types.BlogPostPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_FaqPage_Fragment = (
  { __typename: 'FaqPage' }
  & Pick<Types.FaqPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_FolderPage_Fragment = (
  { __typename: 'FolderPage' }
  & Pick<Types.FolderPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_FreeFormPage_Fragment = (
  { __typename: 'FreeFormPage' }
  & Pick<Types.FreeFormPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_PresentationPage_Fragment = (
  { __typename: 'PresentationPage' }
  & Pick<Types.PresentationPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_ProjectIndexPage_Fragment = (
  { __typename: 'ProjectIndexPage' }
  & Pick<Types.ProjectIndexPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_ProjectPage_Fragment = (
  { __typename: 'ProjectPage' }
  & Pick<Types.ProjectPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_RatioNotebookIndexPage_Fragment = (
  { __typename: 'RatioNotebookIndexPage' }
  & Pick<Types.RatioNotebookIndexPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_RatioNotebookPage_Fragment = (
  { __typename: 'RatioNotebookPage' }
  & Pick<Types.RatioNotebookPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_RatioPresentationIndexPage_Fragment = (
  { __typename: 'RatioPresentationIndexPage' }
  & Pick<Types.RatioPresentationIndexPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_RatioSectionIndexPage_Fragment = (
  { __typename: 'RatioSectionIndexPage' }
  & Pick<Types.RatioSectionIndexPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPage_RatioSectionPage_Fragment = (
  { __typename: 'RatioSectionPage' }
  & Pick<Types.RatioSectionPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url' | 'description'>
  ) }
);

export type CommonWagtailPageFragment = CommonWagtailPage_BlogIndexPage_Fragment | CommonWagtailPage_BlogPostPage_Fragment | CommonWagtailPage_FaqPage_Fragment | CommonWagtailPage_FolderPage_Fragment | CommonWagtailPage_FreeFormPage_Fragment | CommonWagtailPage_PresentationPage_Fragment | CommonWagtailPage_ProjectIndexPage_Fragment | CommonWagtailPage_ProjectPage_Fragment | CommonWagtailPage_RatioNotebookIndexPage_Fragment | CommonWagtailPage_RatioNotebookPage_Fragment | CommonWagtailPage_RatioPresentationIndexPage_Fragment | CommonWagtailPage_RatioSectionIndexPage_Fragment | CommonWagtailPage_RatioSectionPage_Fragment;

export const CommonWagtailPageFragmentDoc: DocumentNode<CommonWagtailPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommonWagtailPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"meta"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]}]}}]}}]};
export const WagtailPageTypeDocument: DocumentNode<WagtailPageTypeQuery, WagtailPageTypeQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WagtailPageType" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "path" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "preview_token" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "wagtailPageOrPrivate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "path" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "path" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "preview_token" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "preview_token" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "WagtailPageContainer" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "page" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "__typename" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }] } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "WagtailPagePrivate" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "message" }, "arguments": [], "directives": [] }] } }] } }] } }] });

export const TildaPageDocument: DocumentNode<TildaPageQuery, TildaPageQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "TildaPage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "path" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tildaPage" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "path" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "path" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "body" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "title" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "description" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "show_header_and_footer" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "og_image" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "spec" }, "value": { "kind": "StringValue", "value": "fill-1200x630", "block": false } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "url" }, "arguments": [], "directives": [] }] } }, { "kind": "Field", "alias": { "kind": "Name", "value": "vk_image" }, "name": { "kind": "Name", "value": "og_image" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "spec" }, "value": { "kind": "StringValue", "value": "fill-1020x456", "block": false } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "url" }, "arguments": [], "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "css" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "url" }, "arguments": [], "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "js" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "url" }, "arguments": [], "directives": [] }] } }] } }] } }] });

export const TildaPagesDocument: DocumentNode<TildaPagesQuery, TildaPagesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "TildaPages" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tildaPages" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "path" }, "arguments": [], "directives": [] }] } }] } }] });

export const WagtailPagesDocument: DocumentNode<WagtailPagesQuery, WagtailPagesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WagtailPages" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "wagtailPages" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "meta" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "url" }, "arguments": [], "directives": [] }] } }] } }] } }] });

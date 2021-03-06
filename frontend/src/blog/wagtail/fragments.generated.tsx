import * as Types from '../../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../../cms/queries.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommonWagtailPageFragmentDoc } from '../../cms/queries.generated';
export type BlogPostAuthorFragment = (
  { __typename: 'BlogPostAuthor' }
  & Pick<Types.BlogPostAuthor, 'name' | 'description'>
  & { image: (
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'url'>
  ) }
);

export type BlogPostPageFragment = (
  { __typename: 'BlogPostPage' }
  & Pick<Types.BlogPostPage, 'summary' | 'date' | 'body'>
  & { authors: Array<(
    { __typename: 'BlogPostAuthor' }
    & BlogPostAuthorFragment
  )> }
  & CommonWagtailPage_BlogPostPage_Fragment
);

export type BlogPostPage_SummaryFragment = (
  { __typename: 'BlogPostPage' }
  & Pick<Types.BlogPostPage, 'id' | 'title' | 'date' | 'summary'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug'>
  ) }
);

export type BlogIndexPageFragment = (
  { __typename: 'BlogIndexPage' }
  & Pick<Types.BlogIndexPage, 'subtitle'>
  & { posts: Array<(
    { __typename: 'BlogPostPage' }
    & BlogPostPage_SummaryFragment
  )> }
  & CommonWagtailPage_BlogIndexPage_Fragment
);

export const BlogPostAuthorFragmentDoc: DocumentNode<BlogPostAuthorFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlogPostAuthor"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BlogPostAuthor"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-200x200","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]}]}}]}}]};
export const BlogPostPageFragmentDoc: DocumentNode<BlogPostPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlogPostPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BlogPostPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"},"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"summary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"date"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"authors"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BlogPostAuthor"},"directives":[]}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...BlogPostAuthorFragmentDoc.definitions]};
export const BlogPostPage_SummaryFragmentDoc: DocumentNode<BlogPostPage_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlogPostPage_summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BlogPostPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"meta"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"date"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"summary"},"arguments":[],"directives":[]}]}}]};
export const BlogIndexPageFragmentDoc: DocumentNode<BlogIndexPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlogIndexPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BlogIndexPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"},"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"subtitle"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BlogPostPage_summary"},"directives":[]}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...BlogPostPage_SummaryFragmentDoc.definitions]};
import * as Types from '../../apollo/types.generated';

import { CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_PresentationPage_Fragment } from '../../cms/queries.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommonWagtailPageFragmentDoc } from '../../cms/queries.generated';
export type BlogPostAuthorFragment = (
  { __typename: 'BlogPostAuthor' }
  & Pick<Types.BlogPostAuthor, 'name' | 'description'>
  & { image: (
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  ), image_2x: (
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
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

export const BlogPostAuthorFragmentDoc: DocumentNode<BlogPostAuthorFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlogPostAuthor"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BlogPostAuthor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-100x100","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"image_2x"},"name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-200x200","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]};
export const BlogPostPageFragmentDoc: DocumentNode<BlogPostPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlogPostPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BlogPostPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BlogPostAuthor"}}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...BlogPostAuthorFragmentDoc.definitions]};
export const BlogPostPage_SummaryFragmentDoc: DocumentNode<BlogPostPage_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlogPostPage_summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BlogPostPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}}]};
export const BlogIndexPageFragmentDoc: DocumentNode<BlogIndexPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlogIndexPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BlogIndexPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BlogPostPage_summary"}}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...BlogPostPage_SummaryFragmentDoc.definitions]};
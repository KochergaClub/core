import * as Types from '../../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../../cms/queries.generated';
import gql from 'graphql-tag';
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

export const BlogPostAuthorFragmentDoc = gql`
    fragment BlogPostAuthor on BlogPostAuthor {
  name
  description
  image(spec: "fill-200x200") {
    url
  }
}
    `;
export const BlogPostPageFragmentDoc = gql`
    fragment BlogPostPage on BlogPostPage {
  ...CommonWagtailPage
  summary
  date
  body
  authors {
    ...BlogPostAuthor
  }
}
    ${CommonWagtailPageFragmentDoc}
${BlogPostAuthorFragmentDoc}`;
export const BlogPostPage_SummaryFragmentDoc = gql`
    fragment BlogPostPage_summary on BlogPostPage {
  id
  title
  meta {
    slug
  }
  date
  summary
}
    `;
export const BlogIndexPageFragmentDoc = gql`
    fragment BlogIndexPage on BlogIndexPage {
  ...CommonWagtailPage
  subtitle
  posts {
    ...BlogPostPage_summary
  }
}
    ${CommonWagtailPageFragmentDoc}
${BlogPostPage_SummaryFragmentDoc}`;
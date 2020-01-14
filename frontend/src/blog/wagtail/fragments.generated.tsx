import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';

export type BlogPostAuthorFragment = (
  { __typename?: 'BlogPostAuthor' }
  & Pick<Types.BlogPostAuthor, 'name' | 'description'>
  & { image: (
    { __typename?: 'WagtailImage' }
    & Pick<Types.WagtailImage, 'url'>
  ) }
);

export type BlogPostPageFragment = (
  { __typename?: 'BlogPostPage' }
  & Pick<Types.BlogPostPage, 'id' | 'title' | 'summary' | 'date' | 'body'>
  & { authors: Array<(
    { __typename?: 'BlogPostAuthor' }
    & BlogPostAuthorFragment
  )> }
);

export type BlogPostPage_SummaryFragment = (
  { __typename?: 'BlogPostPage' }
  & Pick<Types.BlogPostPage, 'id' | 'title' | 'date' | 'summary'>
  & { meta: (
    { __typename?: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug'>
  ) }
);

export type BlogIndexPageFragment = (
  { __typename?: 'BlogIndexPage' }
  & Pick<Types.BlogIndexPage, 'id' | 'title' | 'subtitle'>
  & { posts: Array<(
    { __typename?: 'BlogPostPage' }
    & BlogPostPage_SummaryFragment
  )> }
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
  id
  title
  summary
  date
  body
  authors {
    ...BlogPostAuthor
  }
}
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
  id
  title
  subtitle
  posts {
    ...BlogPostPage_summary
  }
}
    ${BlogPostPage_SummaryFragmentDoc}`;
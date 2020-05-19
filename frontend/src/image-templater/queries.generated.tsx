import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type TemplateFragment = (
  { __typename?: 'ImageTemplate' }
  & Pick<Types.ImageTemplate, 'name'>
  & { schema: (
    { __typename?: 'ImageTemplateSchema' }
    & { fields: Array<(
      { __typename?: 'ImageTemplateSchemaField' }
      & Pick<Types.ImageTemplateSchemaField, 'name' | 'value_type' | 'default'>
    )> }
  ), sizes: (
    { __typename?: 'ImageTemplateSizes' }
    & Pick<Types.ImageTemplateSizes, 'width' | 'height'>
  ) }
);

export type ImageTemplatesQueryVariables = {};


export type ImageTemplatesQuery = (
  { __typename?: 'Query' }
  & { templates: Array<(
    { __typename?: 'ImageTemplate' }
    & TemplateFragment
  )> }
);

export type ImageTemplateBySlugQueryVariables = {
  slug: Types.Scalars['String'];
};


export type ImageTemplateBySlugQuery = (
  { __typename?: 'Query' }
  & { template: (
    { __typename?: 'ImageTemplate' }
    & TemplateFragment
  ) }
);

export const TemplateFragmentDoc = gql`
    fragment Template on ImageTemplate {
  name
  schema {
    fields {
      name
      value_type
      default
    }
  }
  sizes {
    width
    height
  }
}
    `;
export const ImageTemplatesDocument = gql`
    query ImageTemplates {
  templates: imageTemplatesAll {
    ...Template
  }
}
    ${TemplateFragmentDoc}`;

/**
 * __useImageTemplatesQuery__
 *
 * To run a query within a React component, call `useImageTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useImageTemplatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ImageTemplatesQuery, ImageTemplatesQueryVariables>) {
        return ApolloReactHooks.useQuery<ImageTemplatesQuery, ImageTemplatesQueryVariables>(ImageTemplatesDocument, baseOptions);
      }
export function useImageTemplatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ImageTemplatesQuery, ImageTemplatesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ImageTemplatesQuery, ImageTemplatesQueryVariables>(ImageTemplatesDocument, baseOptions);
        }
export type ImageTemplatesQueryHookResult = ReturnType<typeof useImageTemplatesQuery>;
export type ImageTemplatesLazyQueryHookResult = ReturnType<typeof useImageTemplatesLazyQuery>;
export type ImageTemplatesQueryResult = ApolloReactCommon.QueryResult<ImageTemplatesQuery, ImageTemplatesQueryVariables>;
export const ImageTemplateBySlugDocument = gql`
    query ImageTemplateBySlug($slug: String!) {
  template: imageTemplateBySlug(slug: $slug) {
    ...Template
  }
}
    ${TemplateFragmentDoc}`;

/**
 * __useImageTemplateBySlugQuery__
 *
 * To run a query within a React component, call `useImageTemplateBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageTemplateBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageTemplateBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useImageTemplateBySlugQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ImageTemplateBySlugQuery, ImageTemplateBySlugQueryVariables>) {
        return ApolloReactHooks.useQuery<ImageTemplateBySlugQuery, ImageTemplateBySlugQueryVariables>(ImageTemplateBySlugDocument, baseOptions);
      }
export function useImageTemplateBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ImageTemplateBySlugQuery, ImageTemplateBySlugQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ImageTemplateBySlugQuery, ImageTemplateBySlugQueryVariables>(ImageTemplateBySlugDocument, baseOptions);
        }
export type ImageTemplateBySlugQueryHookResult = ReturnType<typeof useImageTemplateBySlugQuery>;
export type ImageTemplateBySlugLazyQueryHookResult = ReturnType<typeof useImageTemplateBySlugLazyQuery>;
export type ImageTemplateBySlugQueryResult = ApolloReactCommon.QueryResult<ImageTemplateBySlugQuery, ImageTemplateBySlugQueryVariables>;
import { BasicLeadBlockFragmentDoc } from './blocks/fragments.generated';
import * as Types from '../apollo/types.generated';

import { MailchimpSubscribeBlockFragment } from './blocks/fragments.generated';
import { PhotoRibbonBlockFragment } from './blocks/fragments.generated';
import { BigContactsBlockFragment } from './blocks/fragments.generated';
import { EventsListBlockFragment } from './blocks/fragments.generated';
import { ColumnsButtonsBlockFragment } from './blocks/fragments.generated';
import { ColumnsMembershipsBlockFragment } from './blocks/fragments.generated';
import { ColumnsBasicBlockFragment } from './blocks/fragments.generated';
import { GreyBlockFragment } from './blocks/fragments.generated';
import { BasicParagraphBlockFragment } from './blocks/fragments.generated';
import { BasicLeadBlockFragment } from './blocks/fragments.generated';
import gql from 'graphql-tag';
import { HeroFrontBlockFragment } from './blocks/fragments.generated';
import { BasicParagraphBlockFragmentDoc } from './blocks/fragments.generated';
import { GreyBlockFragmentDoc } from './blocks/fragments.generated';
import { ColumnsBasicBlockFragmentDoc } from './blocks/fragments.generated';
import { ColumnsMembershipsBlockFragmentDoc } from './blocks/fragments.generated';
import { ColumnsButtonsBlockFragmentDoc } from './blocks/fragments.generated';
import { EventsListBlockFragmentDoc } from './blocks/fragments.generated';
import { BigContactsBlockFragmentDoc } from './blocks/fragments.generated';
import { PhotoRibbonBlockFragmentDoc } from './blocks/fragments.generated';
import { MailchimpSubscribeBlockFragmentDoc } from './blocks/fragments.generated';
import { HeroFrontBlockFragmentDoc } from './blocks/fragments.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';












export type FreeFormPageFragment = (
  { __typename?: 'FreeFormPage' }
  & Pick<Types.FreeFormPage, 'id' | 'title'>
  & { body: Array<(
    { __typename: 'RatioNotebookSectionBlock' }
    & Pick<Types.RatioNotebookSectionBlock, 'id'>
  ) | (
    { __typename: 'RatioHeaderBlock' }
    & Pick<Types.RatioHeaderBlock, 'id'>
  ) | (
    { __typename: 'RatioParagraphBlock' }
    & Pick<Types.RatioParagraphBlock, 'id'>
  ) | (
    { __typename: 'RatioInsetBlock' }
    & Pick<Types.RatioInsetBlock, 'id'>
  ) | (
    { __typename: 'RatioExerciseBlock' }
    & Pick<Types.RatioExerciseBlock, 'id'>
  ) | (
    { __typename: 'RatioExerciseOnelineBlock' }
    & Pick<Types.RatioExerciseOnelineBlock, 'id'>
  ) | (
    { __typename: 'RatioBriefingBlock' }
    & Pick<Types.RatioBriefingBlock, 'id'>
  ) | (
    { __typename: 'RatioMathBlock' }
    & Pick<Types.RatioMathBlock, 'id'>
  ) | (
    { __typename: 'GreyBlock' }
    & Pick<Types.GreyBlock, 'id'>
    & GreyBlockFragment
  ) | (
    { __typename: 'BasicLeadBlock' }
    & Pick<Types.BasicLeadBlock, 'id'>
    & BasicLeadBlockFragment
  ) | (
    { __typename: 'BasicParagraphBlock' }
    & Pick<Types.BasicParagraphBlock, 'id'>
    & BasicParagraphBlockFragment
  ) | (
    { __typename: 'ColumnsBasicBlock' }
    & Pick<Types.ColumnsBasicBlock, 'id'>
    & ColumnsBasicBlockFragment
  ) | (
    { __typename: 'ColumnsMembershipsBlock' }
    & Pick<Types.ColumnsMembershipsBlock, 'id'>
    & ColumnsMembershipsBlockFragment
  ) | (
    { __typename: 'ColumnsButtonsBlock' }
    & Pick<Types.ColumnsButtonsBlock, 'id'>
    & ColumnsButtonsBlockFragment
  ) | (
    { __typename: 'EventsListBlock' }
    & Pick<Types.EventsListBlock, 'id'>
    & EventsListBlockFragment
  ) | (
    { __typename: 'BigContactsBlock' }
    & Pick<Types.BigContactsBlock, 'id'>
    & BigContactsBlockFragment
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & Pick<Types.PhotoRibbonBlock, 'id'>
    & PhotoRibbonBlockFragment
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & Pick<Types.MailchimpSubscribeBlock, 'id'>
    & MailchimpSubscribeBlockFragment
  ) | (
    { __typename: 'HeroFrontBlock' }
    & Pick<Types.HeroFrontBlock, 'id'>
    & HeroFrontBlockFragment
  )> }
);

export type WagtailPageTypeQueryVariables = {
  path: Types.Scalars['String']
};


export type WagtailPageTypeQuery = (
  { __typename?: 'Query' }
  & { wagtailPage: Types.Maybe<{ __typename: 'ProjectPage' } | { __typename: 'RatioSectionIndexPage' } | { __typename: 'RatioSectionPage' } | { __typename: 'RatioNotebookPage' } | { __typename: 'ProjectIndexPage' } | { __typename: 'FreeFormPage' } | { __typename: 'BlogPostPage' } | { __typename: 'BlogIndexPage' } | { __typename: 'FaqPage' }> }
);

export const FreeFormPageFragmentDoc = gql`
    fragment FreeFormPage on FreeFormPage {
  id
  title
  body {
    __typename
    id
    ...BasicLeadBlock
    ...BasicParagraphBlock
    ...GreyBlock
    ...ColumnsBasicBlock
    ...ColumnsMembershipsBlock
    ...ColumnsButtonsBlock
    ...EventsListBlock
    ...BigContactsBlock
    ...PhotoRibbonBlock
    ...MailchimpSubscribeBlock
    ...HeroFrontBlock
  }
}
    ${BasicLeadBlockFragmentDoc}
${BasicParagraphBlockFragmentDoc}
${GreyBlockFragmentDoc}
${ColumnsBasicBlockFragmentDoc}
${ColumnsMembershipsBlockFragmentDoc}
${ColumnsButtonsBlockFragmentDoc}
${EventsListBlockFragmentDoc}
${BigContactsBlockFragmentDoc}
${PhotoRibbonBlockFragmentDoc}
${MailchimpSubscribeBlockFragmentDoc}
${HeroFrontBlockFragmentDoc}`;
export const WagtailPageTypeDocument = gql`
    query WagtailPageType($path: String!) {
  wagtailPage(path: $path) {
    __typename
  }
}
    `;

/**
 * __useWagtailPageTypeQuery__
 *
 * To run a query within a React component, call `useWagtailPageTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useWagtailPageTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWagtailPageTypeQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useWagtailPageTypeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>) {
        return ApolloReactHooks.useQuery<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>(WagtailPageTypeDocument, baseOptions);
      }
export function useWagtailPageTypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>(WagtailPageTypeDocument, baseOptions);
        }
export type WagtailPageTypeQueryHookResult = ReturnType<typeof useWagtailPageTypeQuery>;
export type WagtailPageTypeLazyQueryHookResult = ReturnType<typeof useWagtailPageTypeLazyQuery>;
export type WagtailPageTypeQueryResult = ApolloReactCommon.QueryResult<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>;
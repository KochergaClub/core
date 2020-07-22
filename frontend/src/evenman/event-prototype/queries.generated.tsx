import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type EventsPrototypeFragment = (
  { __typename?: 'EventsPrototype' }
  & Pick<Types.EventsPrototype, 'id' | 'title' | 'summary' | 'description' | 'location' | 'timing_description_override' | 'active' | 'weekday' | 'hour' | 'minute' | 'length' | 'tags' | 'suggested_dates'>
  & { vk_group?: Types.Maybe<(
    { __typename?: 'VkGroup' }
    & Pick<Types.VkGroup, 'name'>
  )>, timepad_category?: Types.Maybe<(
    { __typename?: 'TimepadCategory' }
    & Pick<Types.TimepadCategory, 'code' | 'name'>
  )>, image?: Types.Maybe<(
    { __typename?: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
    & { original_image: (
      { __typename?: 'WagtailImage' }
      & Pick<Types.WagtailImage, 'id'>
    ) }
  )>, project?: Types.Maybe<(
    { __typename?: 'ProjectPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'slug'>
    ) }
  )>, instances: Array<(
    { __typename?: 'EventsEvent' }
    & Pick<Types.EventsEvent, 'id' | 'start' | 'title' | 'visitors'>
  )> }
);

export type EventsPrototype_SummaryFragment = (
  { __typename?: 'EventsPrototype' }
  & Pick<Types.EventsPrototype, 'id' | 'title' | 'active' | 'weekday' | 'hour' | 'minute' | 'suggested_dates'>
);

export type EvenmanPrototypesQueryVariables = {
  suggested_until_ts: Types.Scalars['Int'];
};


export type EvenmanPrototypesQuery = (
  { __typename?: 'Query' }
  & { prototypes: Array<(
    { __typename?: 'EventsPrototype' }
    & EventsPrototype_SummaryFragment
  )> }
);

export type EvenmanPrototypeQueryVariables = {
  id: Types.Scalars['ID'];
};


export type EvenmanPrototypeQuery = (
  { __typename?: 'Query' }
  & { prototype: (
    { __typename?: 'EventsPrototype' }
    & EventsPrototypeFragment
  ) }
);

export type EvenmanPrototypeCreateMutationVariables = {
  title: Types.Scalars['String'];
  location?: Types.Maybe<Types.Scalars['String']>;
  weekday: Types.Scalars['Int'];
  hour: Types.Scalars['Int'];
  minute: Types.Scalars['Int'];
  length: Types.Scalars['Int'];
};


export type EvenmanPrototypeCreateMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename?: 'EventsPrototype' }
      & EventsPrototypeFragment
    ) }
  ) }
);

export type EvenmanPrototypeUpdateMutationVariables = {
  id: Types.Scalars['ID'];
  active?: Types.Maybe<Types.Scalars['Boolean']>;
  title?: Types.Maybe<Types.Scalars['String']>;
  summary?: Types.Maybe<Types.Scalars['String']>;
  description?: Types.Maybe<Types.Scalars['String']>;
  location?: Types.Maybe<Types.Scalars['String']>;
  timing_description_override?: Types.Maybe<Types.Scalars['String']>;
  vk_group_name?: Types.Maybe<Types.Scalars['String']>;
  timepad_category_code?: Types.Maybe<Types.Scalars['String']>;
  project_slug?: Types.Maybe<Types.Scalars['String']>;
};


export type EvenmanPrototypeUpdateMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename?: 'EventsPrototype' }
      & EventsPrototypeFragment
    ) }
  ) }
);

export type EvenmanPrototypeCancelDateMutationVariables = {
  id: Types.Scalars['ID'];
  date: Types.Scalars['String'];
};


export type EvenmanPrototypeCancelDateMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type EvenmanPrototypeNewEventMutationVariables = {
  id: Types.Scalars['ID'];
  ts: Types.Scalars['Int'];
};


export type EvenmanPrototypeNewEventMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type EvenmanPrototypeAddTagMutationVariables = {
  id: Types.Scalars['ID'];
  tag: Types.Scalars['String'];
};


export type EvenmanPrototypeAddTagMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename?: 'EventsPrototype' }
      & Pick<Types.EventsPrototype, 'id' | 'tags'>
    ) }
  ) }
);

export type EvenmanPrototypeDeleteTagMutationVariables = {
  id: Types.Scalars['ID'];
  tag: Types.Scalars['String'];
};


export type EvenmanPrototypeDeleteTagMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename?: 'EventsPrototype' }
      & Pick<Types.EventsPrototype, 'id' | 'tags'>
    ) }
  ) }
);

export type EvenmanPrototypeSetImageMutationVariables = {
  id: Types.Scalars['ID'];
  image_id: Types.Scalars['ID'];
};


export type EvenmanPrototypeSetImageMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename?: 'EventsPrototype' }
      & EventsPrototypeFragment
    ) }
  ) }
);

export const EventsPrototypeFragmentDoc = gql`
    fragment EventsPrototype on EventsPrototype {
  id
  title
  summary
  description
  location
  timing_description_override
  active
  weekday
  hour
  minute
  length
  tags
  vk_group {
    name
  }
  timepad_category {
    code
    name
  }
  image(spec: "width-240") {
    id
    url
    original_image {
      id
    }
  }
  project {
    meta {
      slug
    }
  }
  suggested_dates(limit: 5)
  instances {
    id
    start
    title
    visitors
  }
}
    `;
export const EventsPrototype_SummaryFragmentDoc = gql`
    fragment EventsPrototype_Summary on EventsPrototype {
  id
  title
  active
  weekday
  hour
  minute
  suggested_dates(until_ts: $suggested_until_ts, limit: 10)
}
    `;
export const EvenmanPrototypesDocument = gql`
    query EvenmanPrototypes($suggested_until_ts: Int!) {
  prototypes: eventsPrototypes {
    ...EventsPrototype_Summary
  }
}
    ${EventsPrototype_SummaryFragmentDoc}`;

/**
 * __useEvenmanPrototypesQuery__
 *
 * To run a query within a React component, call `useEvenmanPrototypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanPrototypesQuery({
 *   variables: {
 *      suggested_until_ts: // value for 'suggested_until_ts'
 *   },
 * });
 */
export function useEvenmanPrototypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>(EvenmanPrototypesDocument, baseOptions);
      }
export function useEvenmanPrototypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>(EvenmanPrototypesDocument, baseOptions);
        }
export type EvenmanPrototypesQueryHookResult = ReturnType<typeof useEvenmanPrototypesQuery>;
export type EvenmanPrototypesLazyQueryHookResult = ReturnType<typeof useEvenmanPrototypesLazyQuery>;
export type EvenmanPrototypesQueryResult = ApolloReactCommon.QueryResult<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>;
export const EvenmanPrototypeDocument = gql`
    query EvenmanPrototype($id: ID!) {
  prototype: eventsPrototype(id: $id) {
    ...EventsPrototype
  }
}
    ${EventsPrototypeFragmentDoc}`;

/**
 * __useEvenmanPrototypeQuery__
 *
 * To run a query within a React component, call `useEvenmanPrototypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanPrototypeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEvenmanPrototypeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>(EvenmanPrototypeDocument, baseOptions);
      }
export function useEvenmanPrototypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>(EvenmanPrototypeDocument, baseOptions);
        }
export type EvenmanPrototypeQueryHookResult = ReturnType<typeof useEvenmanPrototypeQuery>;
export type EvenmanPrototypeLazyQueryHookResult = ReturnType<typeof useEvenmanPrototypeLazyQuery>;
export type EvenmanPrototypeQueryResult = ApolloReactCommon.QueryResult<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>;
export const EvenmanPrototypeCreateDocument = gql`
    mutation EvenmanPrototypeCreate($title: String!, $location: String, $weekday: Int!, $hour: Int!, $minute: Int!, $length: Int!) {
  result: eventPrototypeCreate(input: {title: $title, location: $location, weekday: $weekday, hour: $hour, minute: $minute, length: $length}) {
    ok
    prototype {
      ...EventsPrototype
    }
  }
}
    ${EventsPrototypeFragmentDoc}`;
export type EvenmanPrototypeCreateMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeCreateMutation, EvenmanPrototypeCreateMutationVariables>;

/**
 * __useEvenmanPrototypeCreateMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeCreateMutation, { data, loading, error }] = useEvenmanPrototypeCreateMutation({
 *   variables: {
 *      title: // value for 'title'
 *      location: // value for 'location'
 *      weekday: // value for 'weekday'
 *      hour: // value for 'hour'
 *      minute: // value for 'minute'
 *      length: // value for 'length'
 *   },
 * });
 */
export function useEvenmanPrototypeCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeCreateMutation, EvenmanPrototypeCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeCreateMutation, EvenmanPrototypeCreateMutationVariables>(EvenmanPrototypeCreateDocument, baseOptions);
      }
export type EvenmanPrototypeCreateMutationHookResult = ReturnType<typeof useEvenmanPrototypeCreateMutation>;
export type EvenmanPrototypeCreateMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeCreateMutation>;
export type EvenmanPrototypeCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeCreateMutation, EvenmanPrototypeCreateMutationVariables>;
export const EvenmanPrototypeUpdateDocument = gql`
    mutation EvenmanPrototypeUpdate($id: ID!, $active: Boolean, $title: String, $summary: String, $description: String, $location: String, $timing_description_override: String, $vk_group_name: String, $timepad_category_code: String, $project_slug: String) {
  result: eventPrototypeUpdate(input: {id: $id, active: $active, title: $title, summary: $summary, description: $description, location: $location, timing_description_override: $timing_description_override, vk_group_name: $vk_group_name, timepad_category_code: $timepad_category_code, project_slug: $project_slug}) {
    ok
    prototype {
      ...EventsPrototype
    }
  }
}
    ${EventsPrototypeFragmentDoc}`;
export type EvenmanPrototypeUpdateMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeUpdateMutation, EvenmanPrototypeUpdateMutationVariables>;

/**
 * __useEvenmanPrototypeUpdateMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeUpdateMutation, { data, loading, error }] = useEvenmanPrototypeUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      active: // value for 'active'
 *      title: // value for 'title'
 *      summary: // value for 'summary'
 *      description: // value for 'description'
 *      location: // value for 'location'
 *      timing_description_override: // value for 'timing_description_override'
 *      vk_group_name: // value for 'vk_group_name'
 *      timepad_category_code: // value for 'timepad_category_code'
 *      project_slug: // value for 'project_slug'
 *   },
 * });
 */
export function useEvenmanPrototypeUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeUpdateMutation, EvenmanPrototypeUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeUpdateMutation, EvenmanPrototypeUpdateMutationVariables>(EvenmanPrototypeUpdateDocument, baseOptions);
      }
export type EvenmanPrototypeUpdateMutationHookResult = ReturnType<typeof useEvenmanPrototypeUpdateMutation>;
export type EvenmanPrototypeUpdateMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeUpdateMutation>;
export type EvenmanPrototypeUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeUpdateMutation, EvenmanPrototypeUpdateMutationVariables>;
export const EvenmanPrototypeCancelDateDocument = gql`
    mutation EvenmanPrototypeCancelDate($id: ID!, $date: String!) {
  result: eventPrototypeCancelDate(input: {id: $id, date: $date}) {
    ok
  }
}
    `;
export type EvenmanPrototypeCancelDateMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeCancelDateMutation, EvenmanPrototypeCancelDateMutationVariables>;

/**
 * __useEvenmanPrototypeCancelDateMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeCancelDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeCancelDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeCancelDateMutation, { data, loading, error }] = useEvenmanPrototypeCancelDateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useEvenmanPrototypeCancelDateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeCancelDateMutation, EvenmanPrototypeCancelDateMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeCancelDateMutation, EvenmanPrototypeCancelDateMutationVariables>(EvenmanPrototypeCancelDateDocument, baseOptions);
      }
export type EvenmanPrototypeCancelDateMutationHookResult = ReturnType<typeof useEvenmanPrototypeCancelDateMutation>;
export type EvenmanPrototypeCancelDateMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeCancelDateMutation>;
export type EvenmanPrototypeCancelDateMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeCancelDateMutation, EvenmanPrototypeCancelDateMutationVariables>;
export const EvenmanPrototypeNewEventDocument = gql`
    mutation EvenmanPrototypeNewEvent($id: ID!, $ts: Int!) {
  result: eventPrototypeNewEvent(input: {id: $id, ts: $ts}) {
    ok
  }
}
    `;
export type EvenmanPrototypeNewEventMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeNewEventMutation, EvenmanPrototypeNewEventMutationVariables>;

/**
 * __useEvenmanPrototypeNewEventMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeNewEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeNewEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeNewEventMutation, { data, loading, error }] = useEvenmanPrototypeNewEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      ts: // value for 'ts'
 *   },
 * });
 */
export function useEvenmanPrototypeNewEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeNewEventMutation, EvenmanPrototypeNewEventMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeNewEventMutation, EvenmanPrototypeNewEventMutationVariables>(EvenmanPrototypeNewEventDocument, baseOptions);
      }
export type EvenmanPrototypeNewEventMutationHookResult = ReturnType<typeof useEvenmanPrototypeNewEventMutation>;
export type EvenmanPrototypeNewEventMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeNewEventMutation>;
export type EvenmanPrototypeNewEventMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeNewEventMutation, EvenmanPrototypeNewEventMutationVariables>;
export const EvenmanPrototypeAddTagDocument = gql`
    mutation EvenmanPrototypeAddTag($id: ID!, $tag: String!) {
  result: eventPrototypeAddTag(input: {id: $id, tag: $tag}) {
    ok
    prototype {
      id
      tags
    }
  }
}
    `;
export type EvenmanPrototypeAddTagMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeAddTagMutation, EvenmanPrototypeAddTagMutationVariables>;

/**
 * __useEvenmanPrototypeAddTagMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeAddTagMutation, { data, loading, error }] = useEvenmanPrototypeAddTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useEvenmanPrototypeAddTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeAddTagMutation, EvenmanPrototypeAddTagMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeAddTagMutation, EvenmanPrototypeAddTagMutationVariables>(EvenmanPrototypeAddTagDocument, baseOptions);
      }
export type EvenmanPrototypeAddTagMutationHookResult = ReturnType<typeof useEvenmanPrototypeAddTagMutation>;
export type EvenmanPrototypeAddTagMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeAddTagMutation>;
export type EvenmanPrototypeAddTagMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeAddTagMutation, EvenmanPrototypeAddTagMutationVariables>;
export const EvenmanPrototypeDeleteTagDocument = gql`
    mutation EvenmanPrototypeDeleteTag($id: ID!, $tag: String!) {
  result: eventPrototypeDeleteTag(input: {id: $id, tag: $tag}) {
    ok
    prototype {
      id
      tags
    }
  }
}
    `;
export type EvenmanPrototypeDeleteTagMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeDeleteTagMutation, EvenmanPrototypeDeleteTagMutationVariables>;

/**
 * __useEvenmanPrototypeDeleteTagMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeDeleteTagMutation, { data, loading, error }] = useEvenmanPrototypeDeleteTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useEvenmanPrototypeDeleteTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeDeleteTagMutation, EvenmanPrototypeDeleteTagMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeDeleteTagMutation, EvenmanPrototypeDeleteTagMutationVariables>(EvenmanPrototypeDeleteTagDocument, baseOptions);
      }
export type EvenmanPrototypeDeleteTagMutationHookResult = ReturnType<typeof useEvenmanPrototypeDeleteTagMutation>;
export type EvenmanPrototypeDeleteTagMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeDeleteTagMutation>;
export type EvenmanPrototypeDeleteTagMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeDeleteTagMutation, EvenmanPrototypeDeleteTagMutationVariables>;
export const EvenmanPrototypeSetImageDocument = gql`
    mutation EvenmanPrototypeSetImage($id: ID!, $image_id: ID!) {
  result: eventPrototypeSetImage(input: {id: $id, image_id: $image_id}) {
    ok
    prototype {
      ...EventsPrototype
    }
  }
}
    ${EventsPrototypeFragmentDoc}`;
export type EvenmanPrototypeSetImageMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeSetImageMutation, EvenmanPrototypeSetImageMutationVariables>;

/**
 * __useEvenmanPrototypeSetImageMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeSetImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeSetImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeSetImageMutation, { data, loading, error }] = useEvenmanPrototypeSetImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      image_id: // value for 'image_id'
 *   },
 * });
 */
export function useEvenmanPrototypeSetImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeSetImageMutation, EvenmanPrototypeSetImageMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeSetImageMutation, EvenmanPrototypeSetImageMutationVariables>(EvenmanPrototypeSetImageDocument, baseOptions);
      }
export type EvenmanPrototypeSetImageMutationHookResult = ReturnType<typeof useEvenmanPrototypeSetImageMutation>;
export type EvenmanPrototypeSetImageMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeSetImageMutation>;
export type EvenmanPrototypeSetImageMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeSetImageMutation, EvenmanPrototypeSetImageMutationVariables>;
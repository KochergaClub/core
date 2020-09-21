import * as Types from '../../apollo/types.generated';

import { WagtailImage_ForEditorFragment } from '../../components/images/ImageEditor/fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { WagtailImage_ForEditorFragmentDoc } from '../../components/images/ImageEditor/fragments.generated';
export type EvenmanWeeklyDigestFragment = (
  { __typename: 'EventsWeeklyDigest' }
  & Pick<Types.EventsWeeklyDigest, 'id' | 'start'>
  & { image?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
    & { original_image: (
      { __typename: 'WagtailImage' }
      & WagtailImage_ForEditorFragment
    ) }
  )>, mailchimp: (
    { __typename: 'EventsWeeklyDigestMailchimp' }
    & Pick<Types.EventsWeeklyDigestMailchimp, 'link'>
  ), telegram: (
    { __typename: 'EventsWeeklyDigestTelegram' }
    & Pick<Types.EventsWeeklyDigestTelegram, 'link'>
  ), vk: (
    { __typename: 'EventsWeeklyDigestVk' }
    & Pick<Types.EventsWeeklyDigestVk, 'link'>
  ) }
);

export type EvenmanWeeklyDigestQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanWeeklyDigestQuery = (
  { __typename: 'Query' }
  & { digest: (
    { __typename: 'EventsWeeklyDigest' }
    & EvenmanWeeklyDigestFragment
  ) }
);

export type EvenmanDigestToVkMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanDigestToVkMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventsWeeklyDigestUpdateResult' }
    & Pick<Types.EventsWeeklyDigestUpdateResult, 'ok'>
    & { digest: (
      { __typename: 'EventsWeeklyDigest' }
      & EvenmanWeeklyDigestFragment
    ) }
  ) }
);

export type EvenmanDigestToTelegramMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanDigestToTelegramMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventsWeeklyDigestUpdateResult' }
    & Pick<Types.EventsWeeklyDigestUpdateResult, 'ok'>
    & { digest: (
      { __typename: 'EventsWeeklyDigest' }
      & EvenmanWeeklyDigestFragment
    ) }
  ) }
);

export type EvenmanDigestToMailchimpMutationVariables = Types.Exact<{
  text: Types.Scalars['String'];
}>;


export type EvenmanDigestToMailchimpMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventsWeeklyDigestUpdateResult' }
    & Pick<Types.EventsWeeklyDigestUpdateResult, 'ok'>
    & { digest: (
      { __typename: 'EventsWeeklyDigest' }
      & EvenmanWeeklyDigestFragment
    ) }
  ) }
);

export type EvenmanVkWikiScheduleUpdateMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanVkWikiScheduleUpdateMutation = (
  { __typename: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  )> }
);

export const EvenmanWeeklyDigestFragmentDoc: DocumentNode<EvenmanWeeklyDigestFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanWeeklyDigest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventsWeeklyDigest"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-240","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"original_image"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailImage_ForEditor"},"directives":[]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mailchimp"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"telegram"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"vk"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}}]}},...WagtailImage_ForEditorFragmentDoc.definitions]};
export const EvenmanWeeklyDigestDocument: DocumentNode<EvenmanWeeklyDigestQuery, EvenmanWeeklyDigestQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvenmanWeeklyDigest"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"digest"},"name":{"kind":"Name","value":"eventsWeeklyDigestCurrent"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"},"directives":[]}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions]};
export const EvenmanDigestToVkDocument: DocumentNode<EvenmanDigestToVkMutation, EvenmanDigestToVkMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanDigestToVk"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventsWeeklyDigestPostVk"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"digest"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"},"directives":[]}]}}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions]};
export const EvenmanDigestToTelegramDocument: DocumentNode<EvenmanDigestToTelegramMutation, EvenmanDigestToTelegramMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanDigestToTelegram"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventsWeeklyDigestPostTelegram"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"digest"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"},"directives":[]}]}}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions]};
export const EvenmanDigestToMailchimpDocument: DocumentNode<EvenmanDigestToMailchimpMutation, EvenmanDigestToMailchimpMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanDigestToMailchimp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventsWeeklyDigestPostMailchimp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"digest"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"},"directives":[]}]}}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions]};
export const EvenmanVkWikiScheduleUpdateDocument: DocumentNode<EvenmanVkWikiScheduleUpdateMutation, EvenmanVkWikiScheduleUpdateMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanVkWikiScheduleUpdate"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"vkWikiScheduleUpdate"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]}]}}]}}]};
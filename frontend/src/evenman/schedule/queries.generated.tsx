import * as Types from '../../apollo/types.generated';

import { GenericErrorFragment, ValidationErrorFragment } from '../../apollo/common-fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../apollo/common-fragments.generated';
export type EvenmanWeeklyDigestFragment = (
  { __typename: 'EventsWeeklyDigest' }
  & Pick<Types.EventsWeeklyDigest, 'id' | 'start'>
  & { image?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
    & { original_image: (
      { __typename: 'WagtailImage' }
      & Pick<Types.WagtailImage, 'id' | 'url'>
    ) }
  )>, image_x2?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )>, mailchimp: (
    { __typename: 'EventsWeeklyDigestMailchimp' }
    & Pick<Types.EventsWeeklyDigestMailchimp, 'link' | 'is_sent'>
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
  input: Types.EventsWeeklyDigestPostMailchimpInput;
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

export type EvenmanCancelMailchimpMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanCancelMailchimpMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) | (
    { __typename: 'EventsWeeklyDigest' }
    & EvenmanWeeklyDigestFragment
  ) }
);

export type EvenmanSendMailchimpMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanSendMailchimpMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) | (
    { __typename: 'EventsWeeklyDigest' }
    & EvenmanWeeklyDigestFragment
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

export const EvenmanWeeklyDigestFragmentDoc: DocumentNode<EvenmanWeeklyDigestFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanWeeklyDigest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventsWeeklyDigest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-240","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"original_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"image_x2"},"name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-480","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mailchimp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"is_sent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"telegram"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]};
export const EvenmanWeeklyDigestDocument: DocumentNode<EvenmanWeeklyDigestQuery, EvenmanWeeklyDigestQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvenmanWeeklyDigest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"digest"},"name":{"kind":"Name","value":"eventsWeeklyDigestCurrent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"}}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions]};
export const EvenmanDigestToVkDocument: DocumentNode<EvenmanDigestToVkMutation, EvenmanDigestToVkMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanDigestToVk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventsWeeklyDigestPostVk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"digest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"}}]}}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions]};
export const EvenmanDigestToTelegramDocument: DocumentNode<EvenmanDigestToTelegramMutation, EvenmanDigestToTelegramMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanDigestToTelegram"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventsWeeklyDigestPostTelegram"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"digest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"}}]}}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions]};
export const EvenmanDigestToMailchimpDocument: DocumentNode<EvenmanDigestToMailchimpMutation, EvenmanDigestToMailchimpMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanDigestToMailchimp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventsWeeklyDigestPostMailchimpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventsWeeklyDigestPostMailchimp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"digest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"}}]}}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions]};
export const EvenmanCancelMailchimpDocument: DocumentNode<EvenmanCancelMailchimpMutation, EvenmanCancelMailchimpMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanCancelMailchimp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"cancelWeeklyDigestMailchimp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenericError"}}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions,...GenericErrorFragmentDoc.definitions]};
export const EvenmanSendMailchimpDocument: DocumentNode<EvenmanSendMailchimpMutation, EvenmanSendMailchimpMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanSendMailchimp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"sendWeeklyDigestMailchimp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanWeeklyDigest"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenericError"}}]}}]}},...EvenmanWeeklyDigestFragmentDoc.definitions,...GenericErrorFragmentDoc.definitions]};
export const EvenmanVkWikiScheduleUpdateDocument: DocumentNode<EvenmanVkWikiScheduleUpdateMutation, EvenmanVkWikiScheduleUpdateMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanVkWikiScheduleUpdate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"vkWikiScheduleUpdate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]};
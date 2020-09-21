import * as Types from '../../apollo/types.generated';

import { WagtailImage_ForEditorFragment } from '../../components/images/ImageEditor/fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { WagtailImage_ForEditorFragmentDoc } from '../../components/images/ImageEditor/fragments.generated';
export type EventsPrototypeFragment = (
  { __typename: 'EventsPrototype' }
  & Pick<Types.EventsPrototype, 'id' | 'title' | 'summary' | 'description' | 'location' | 'timing_description_override' | 'active' | 'weekday' | 'hour' | 'minute' | 'length' | 'tags' | 'suggested_dates'>
  & { vk_group?: Types.Maybe<(
    { __typename: 'VkGroup' }
    & Pick<Types.VkGroup, 'name'>
  )>, timepad_category?: Types.Maybe<(
    { __typename: 'TimepadCategory' }
    & Pick<Types.TimepadCategory, 'code' | 'name'>
  )>, image?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
    & { original_image: (
      { __typename: 'WagtailImage' }
      & WagtailImage_ForEditorFragment
    ) }
  )>, project?: Types.Maybe<(
    { __typename: 'ProjectPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'slug'>
    ) }
  )>, instances: Array<(
    { __typename: 'Event' }
    & Pick<Types.Event, 'id' | 'start' | 'title' | 'visitors'>
  )> }
);

export type EventsPrototype_SummaryFragment = (
  { __typename: 'EventsPrototype' }
  & Pick<Types.EventsPrototype, 'id' | 'title' | 'active' | 'weekday' | 'hour' | 'minute' | 'suggested_dates'>
);

export type EvenmanPrototypesQueryVariables = Types.Exact<{
  suggested_until_ts: Types.Scalars['Int'];
}>;


export type EvenmanPrototypesQuery = (
  { __typename: 'Query' }
  & { prototypes: Array<(
    { __typename: 'EventsPrototype' }
    & EventsPrototype_SummaryFragment
  )> }
);

export type EvenmanPrototypeQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EvenmanPrototypeQuery = (
  { __typename: 'Query' }
  & { prototype: (
    { __typename: 'EventsPrototype' }
    & EventsPrototypeFragment
  ) }
);

export type EvenmanPrototypeCreateMutationVariables = Types.Exact<{
  title: Types.Scalars['String'];
  location?: Types.Maybe<Types.Scalars['String']>;
  weekday: Types.Scalars['Int'];
  hour: Types.Scalars['Int'];
  minute: Types.Scalars['Int'];
  length: Types.Scalars['Int'];
}>;


export type EvenmanPrototypeCreateMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename: 'EventsPrototype' }
      & EventsPrototypeFragment
    ) }
  ) }
);

export type EvenmanPrototypeUpdateMutationVariables = Types.Exact<{
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
  length?: Types.Maybe<Types.Scalars['Int']>;
  weekday?: Types.Maybe<Types.Scalars['Int']>;
  hour?: Types.Maybe<Types.Scalars['Int']>;
  minute?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type EvenmanPrototypeUpdateMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename: 'EventsPrototype' }
      & EventsPrototypeFragment
    ) }
  ) }
);

export type EvenmanPrototypeCancelDateMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  date: Types.Scalars['String'];
}>;


export type EvenmanPrototypeCancelDateMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type EvenmanPrototypeNewEventMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  ts: Types.Scalars['Int'];
}>;


export type EvenmanPrototypeNewEventMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type EvenmanPrototypeAddTagMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  tag: Types.Scalars['String'];
}>;


export type EvenmanPrototypeAddTagMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename: 'EventsPrototype' }
      & Pick<Types.EventsPrototype, 'id' | 'tags'>
    ) }
  ) }
);

export type EvenmanPrototypeDeleteTagMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  tag: Types.Scalars['String'];
}>;


export type EvenmanPrototypeDeleteTagMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename: 'EventsPrototype' }
      & Pick<Types.EventsPrototype, 'id' | 'tags'>
    ) }
  ) }
);

export type EvenmanPrototypeSetImageMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  image_id: Types.Scalars['ID'];
}>;


export type EvenmanPrototypeSetImageMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
    & { prototype: (
      { __typename: 'EventsPrototype' }
      & EventsPrototypeFragment
    ) }
  ) }
);

export const EventsPrototypeFragmentDoc: DocumentNode<EventsPrototypeFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventsPrototype"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventsPrototype"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"summary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"location"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"timing_description_override"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"active"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"weekday"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hour"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minute"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"length"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"vk_group"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"timepad_category"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-240","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"original_image"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailImage_ForEditor"},"directives":[]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"suggested_dates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"instances"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"visitors"},"arguments":[],"directives":[]}]}}]}},...WagtailImage_ForEditorFragmentDoc.definitions]};
export const EventsPrototype_SummaryFragmentDoc: DocumentNode<EventsPrototype_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventsPrototype_Summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventsPrototype"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"active"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"weekday"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hour"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minute"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"suggested_dates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"until_ts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"suggested_until_ts"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"directives":[]}]}}]};
export const EvenmanPrototypesDocument: DocumentNode<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanPrototypes" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "suggested_until_ts" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "prototypes" }, "name": { "kind": "Name", "value": "eventsPrototypes" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EventsPrototype_Summary" }, "directives": [] }] } }] } }, ...EventsPrototype_SummaryFragmentDoc.definitions] });

export const EvenmanPrototypeDocument: DocumentNode<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanPrototype" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "prototype" }, "name": { "kind": "Name", "value": "eventsPrototype" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EventsPrototype" }, "directives": [] }] } }] } }, ...EventsPrototypeFragmentDoc.definitions] });

export const EvenmanPrototypeCreateDocument: DocumentNode<EvenmanPrototypeCreateMutation, EvenmanPrototypeCreateMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanPrototypeCreate" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "title" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "location" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "weekday" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "hour" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "minute" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "length" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventPrototypeCreate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "title" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "title" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "location" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "location" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "weekday" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "weekday" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "hour" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "hour" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "minute" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "minute" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "length" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "length" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "prototype" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EventsPrototype" }, "directives": [] }] } }] } }] } }, ...EventsPrototypeFragmentDoc.definitions] });

export const EvenmanPrototypeUpdateDocument: DocumentNode<EvenmanPrototypeUpdateMutation, EvenmanPrototypeUpdateMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanPrototypeUpdate" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "active" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "title" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "summary" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "description" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "location" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "timing_description_override" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "vk_group_name" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "timepad_category_code" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "project_slug" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "length" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "weekday" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "hour" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "minute" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventPrototypeUpdate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "active" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "active" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "title" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "title" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "summary" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "summary" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "description" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "description" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "location" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "location" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "timing_description_override" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "timing_description_override" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "vk_group_name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "vk_group_name" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "timepad_category_code" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "timepad_category_code" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "project_slug" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "project_slug" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "length" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "length" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "weekday" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "weekday" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "hour" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "hour" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "minute" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "minute" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "prototype" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EventsPrototype" }, "directives": [] }] } }] } }] } }, ...EventsPrototypeFragmentDoc.definitions] });

export const EvenmanPrototypeCancelDateDocument: DocumentNode<EvenmanPrototypeCancelDateMutation, EvenmanPrototypeCancelDateMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanPrototypeCancelDate" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "date" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventPrototypeCancelDate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "date" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "date" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });

export const EvenmanPrototypeNewEventDocument: DocumentNode<EvenmanPrototypeNewEventMutation, EvenmanPrototypeNewEventMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanPrototypeNewEvent" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "ts" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventPrototypeNewEvent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "ts" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "ts" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });

export const EvenmanPrototypeAddTagDocument: DocumentNode<EvenmanPrototypeAddTagMutation, EvenmanPrototypeAddTagMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanPrototypeAddTag" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "tag" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventPrototypeAddTag" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "tag" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "tag" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "prototype" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "tags" }, "arguments": [], "directives": [] }] } }] } }] } }] });

export const EvenmanPrototypeDeleteTagDocument: DocumentNode<EvenmanPrototypeDeleteTagMutation, EvenmanPrototypeDeleteTagMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanPrototypeDeleteTag" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "tag" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventPrototypeDeleteTag" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "tag" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "tag" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "prototype" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "tags" }, "arguments": [], "directives": [] }] } }] } }] } }] });

export const EvenmanPrototypeSetImageDocument: DocumentNode<EvenmanPrototypeSetImageMutation, EvenmanPrototypeSetImageMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanPrototypeSetImage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "image_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventPrototypeSetImage" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "image_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "image_id" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "prototype" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EventsPrototype" }, "directives": [] }] } }] } }] } }, ...EventsPrototypeFragmentDoc.definitions] });

import * as Types from '../apollo/types.generated';

import { ValidationErrorFragment, GenericErrorFragment } from '../apollo/common-fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { ValidationErrorFragmentDoc, GenericErrorFragmentDoc } from '../apollo/common-fragments.generated';
export type WatchmanFragment = (
  { __typename: 'WatchmenWatchman' }
  & Pick<Types.WatchmenWatchman, 'id' | 'priority'>
  & { grade?: Types.Maybe<(
    { __typename: 'WatchmenGrade' }
    & Pick<Types.WatchmenGrade, 'id' | 'code'>
  )>, member: (
    { __typename: 'StaffMember' }
    & Pick<Types.StaffMember, 'id' | 'short_name'>
  ) }
);

export type WatchmanForPickerFragment = (
  { __typename: 'WatchmenWatchman' }
  & Pick<Types.WatchmenWatchman, 'id' | 'priority'>
  & { member: (
    { __typename: 'StaffMember' }
    & Pick<Types.StaffMember, 'id' | 'short_name' | 'color'>
  ) }
);

export type GradeFragment = (
  { __typename: 'WatchmenGrade' }
  & Pick<Types.WatchmenGrade, 'id' | 'code' | 'multiplier'>
);

export type ShiftFragment = (
  { __typename: 'WatchmenShift' }
  & Pick<Types.WatchmenShift, 'date' | 'shift' | 'is_night'>
  & { watchman?: Types.Maybe<(
    { __typename: 'WatchmenWatchman' }
    & WatchmanForPickerFragment
  )> }
);

export type WatchmenWatchmenListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WatchmenWatchmenListQuery = (
  { __typename: 'Query' }
  & { watchmen: Array<(
    { __typename: 'WatchmenWatchman' }
    & WatchmanFragment
  )> }
);

export type WatchmenWatchmenListForPickerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WatchmenWatchmenListForPickerQuery = (
  { __typename: 'Query' }
  & { watchmen: Array<(
    { __typename: 'WatchmenWatchman' }
    & WatchmanForPickerFragment
  )> }
);

export type WatchmenGradesListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WatchmenGradesListQuery = (
  { __typename: 'Query' }
  & { grades: Array<(
    { __typename: 'WatchmenGrade' }
    & GradeFragment
  )> }
);

export type WatchmenShiftsQueryVariables = Types.Exact<{
  from_date: Types.Scalars['String'];
  to_date: Types.Scalars['String'];
}>;


export type WatchmenShiftsQuery = (
  { __typename: 'Query' }
  & { shifts: Array<(
    { __typename: 'WatchmenShift' }
    & ShiftFragment
  )> }
);

export type WatchmenSetWatchmanPriorityMutationVariables = Types.Exact<{
  input: Types.WatchmenSetWatchmanPriorityInput;
}>;


export type WatchmenSetWatchmanPriorityMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'watchmenSetWatchmanPriority'>
);

export type WatchmenSetWatchmanGradeMutationVariables = Types.Exact<{
  input: Types.WatchmenSetWatchmanGradeInput;
}>;


export type WatchmenSetWatchmanGradeMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'watchmenSetWatchmanGrade'>
);

export type WatchmenCreateWatchmanMutationVariables = Types.Exact<{
  input: Types.WatchmenCreateWatchmanInput;
}>;


export type WatchmenCreateWatchmanMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'watchmenCreateWatchman'>
);

export type WatchmenUpdateShiftMutationVariables = Types.Exact<{
  input: Types.WatchmenUpdateShiftInput;
}>;


export type WatchmenUpdateShiftMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'WatchmenShift' }
    & ShiftFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type OnWatchmenScheduleUpdatesSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OnWatchmenScheduleUpdatesSubscription = (
  { __typename: 'Subscription' }
  & { watchmenScheduleUpdates: (
    { __typename: 'WatchmenScheduleUpdateNotification' }
    & Pick<Types.WatchmenScheduleUpdateNotification, 'updated'>
  ) }
);

export const WatchmanFragmentDoc: DocumentNode<WatchmanFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Watchman"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenWatchman"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"grade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"short_name"}}]}}]}}]};
export const GradeFragmentDoc: DocumentNode<GradeFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Grade"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenGrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"multiplier"}}]}}]};
export const WatchmanForPickerFragmentDoc: DocumentNode<WatchmanForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WatchmanForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenWatchman"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"short_name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]};
export const ShiftFragmentDoc: DocumentNode<ShiftFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Shift"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenShift"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"shift"}},{"kind":"Field","name":{"kind":"Name","value":"watchman"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WatchmanForPicker"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_night"}}]}},...WatchmanForPickerFragmentDoc.definitions]};
export const WatchmenWatchmenListDocument: DocumentNode<WatchmenWatchmenListQuery, WatchmenWatchmenListQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WatchmenWatchmenList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"watchmen"},"name":{"kind":"Name","value":"watchmenWatchmenAll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"currentStaff"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Watchman"}}]}}]}},...WatchmanFragmentDoc.definitions]};
export const WatchmenWatchmenListForPickerDocument: DocumentNode<WatchmenWatchmenListForPickerQuery, WatchmenWatchmenListForPickerQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WatchmenWatchmenListForPicker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"watchmen"},"name":{"kind":"Name","value":"watchmenWatchmenAll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"currentStaff"},"value":{"kind":"BooleanValue","value":true}},{"kind":"Argument","name":{"kind":"Name","value":"currentRole"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WatchmanForPicker"}}]}}]}},...WatchmanForPickerFragmentDoc.definitions]};
export const WatchmenGradesListDocument: DocumentNode<WatchmenGradesListQuery, WatchmenGradesListQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WatchmenGradesList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"grades"},"name":{"kind":"Name","value":"watchmenGradesAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Grade"}}]}}]}},...GradeFragmentDoc.definitions]};
export const WatchmenShiftsDocument: DocumentNode<WatchmenShiftsQuery, WatchmenShiftsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WatchmenShifts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from_date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to_date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"shifts"},"name":{"kind":"Name","value":"watchmenShifts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from_date"}}},{"kind":"Argument","name":{"kind":"Name","value":"to_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to_date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Shift"}}]}}]}},...ShiftFragmentDoc.definitions]};
export const WatchmenSetWatchmanPriorityDocument: DocumentNode<WatchmenSetWatchmanPriorityMutation, WatchmenSetWatchmanPriorityMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WatchmenSetWatchmanPriority"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenSetWatchmanPriorityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchmenSetWatchmanPriority"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]};
export const WatchmenSetWatchmanGradeDocument: DocumentNode<WatchmenSetWatchmanGradeMutation, WatchmenSetWatchmanGradeMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WatchmenSetWatchmanGrade"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenSetWatchmanGradeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchmenSetWatchmanGrade"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]};
export const WatchmenCreateWatchmanDocument: DocumentNode<WatchmenCreateWatchmanMutation, WatchmenCreateWatchmanMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WatchmenCreateWatchman"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenCreateWatchmanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchmenCreateWatchman"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]};
export const WatchmenUpdateShiftDocument: DocumentNode<WatchmenUpdateShiftMutation, WatchmenUpdateShiftMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WatchmenUpdateShift"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenUpdateShiftInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"watchmenUpdateShift"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Shift"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenericError"}}]}}]}},...ShiftFragmentDoc.definitions,...ValidationErrorFragmentDoc.definitions,...GenericErrorFragmentDoc.definitions]};
export const OnWatchmenScheduleUpdatesDocument: DocumentNode<OnWatchmenScheduleUpdatesSubscription, OnWatchmenScheduleUpdatesSubscriptionVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onWatchmenScheduleUpdates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchmenScheduleUpdates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updated"}}]}}]}}]};
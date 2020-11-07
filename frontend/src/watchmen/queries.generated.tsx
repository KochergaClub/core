import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  params: Types.WatchmenSetWatchmanPriorityInput;
}>;


export type WatchmenSetWatchmanPriorityMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'watchmenSetWatchmanPriority'>
);

export type WatchmenSetWatchmanGradeMutationVariables = Types.Exact<{
  params: Types.WatchmenSetWatchmanGradeInput;
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
  params: Types.WatchmenUpdateShiftInput;
}>;


export type WatchmenUpdateShiftMutation = (
  { __typename: 'Mutation' }
  & { shift: (
    { __typename: 'WatchmenShift' }
    & ShiftFragment
  ) }
);

export const WatchmanFragmentDoc: DocumentNode<WatchmanFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Watchman"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenWatchman"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"priority"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"grade"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"code"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"short_name"},"arguments":[],"directives":[]}]}}]}}]};
export const GradeFragmentDoc: DocumentNode<GradeFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Grade"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenGrade"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"code"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"multiplier"},"arguments":[],"directives":[]}]}}]};
export const WatchmanForPickerFragmentDoc: DocumentNode<WatchmanForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WatchmanForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenWatchman"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"priority"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"member"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"short_name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"color"},"arguments":[],"directives":[]}]}}]}}]};
export const ShiftFragmentDoc: DocumentNode<ShiftFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Shift"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WatchmenShift"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shift"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"watchman"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WatchmanForPicker"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"is_night"},"arguments":[],"directives":[]}]}},...WatchmanForPickerFragmentDoc.definitions]};
export const WatchmenWatchmenListDocument: DocumentNode<WatchmenWatchmenListQuery, WatchmenWatchmenListQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WatchmenWatchmenList" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "watchmen" }, "name": { "kind": "Name", "value": "watchmenWatchmenAll" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "currentStaff" }, "value": { "kind": "BooleanValue", "value": true } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Watchman" }, "directives": [] }] } }] } }, ...WatchmanFragmentDoc.definitions] });

export const WatchmenWatchmenListForPickerDocument: DocumentNode<WatchmenWatchmenListForPickerQuery, WatchmenWatchmenListForPickerQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WatchmenWatchmenListForPicker" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "watchmen" }, "name": { "kind": "Name", "value": "watchmenWatchmenAll" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "currentStaff" }, "value": { "kind": "BooleanValue", "value": true } }, { "kind": "Argument", "name": { "kind": "Name", "value": "currentRole" }, "value": { "kind": "BooleanValue", "value": true } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "WatchmanForPicker" }, "directives": [] }] } }] } }, ...WatchmanForPickerFragmentDoc.definitions] });

export const WatchmenGradesListDocument: DocumentNode<WatchmenGradesListQuery, WatchmenGradesListQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WatchmenGradesList" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "grades" }, "name": { "kind": "Name", "value": "watchmenGradesAll" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Grade" }, "directives": [] }] } }] } }, ...GradeFragmentDoc.definitions] });

export const WatchmenShiftsDocument: DocumentNode<WatchmenShiftsQuery, WatchmenShiftsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WatchmenShifts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "from_date" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "to_date" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "shifts" }, "name": { "kind": "Name", "value": "watchmenShifts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "from_date" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "from_date" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "to_date" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "to_date" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Shift" }, "directives": [] }] } }] } }, ...ShiftFragmentDoc.definitions] });

export const WatchmenSetWatchmanPriorityDocument: DocumentNode<WatchmenSetWatchmanPriorityMutation, WatchmenSetWatchmanPriorityMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "WatchmenSetWatchmanPriority" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "WatchmenSetWatchmanPriorityInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "watchmenSetWatchmanPriority" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "directives": [] }] } }] });

export const WatchmenSetWatchmanGradeDocument: DocumentNode<WatchmenSetWatchmanGradeMutation, WatchmenSetWatchmanGradeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "WatchmenSetWatchmanGrade" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "WatchmenSetWatchmanGradeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "watchmenSetWatchmanGrade" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "directives": [] }] } }] });

export const WatchmenCreateWatchmanDocument: DocumentNode<WatchmenCreateWatchmanMutation, WatchmenCreateWatchmanMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "WatchmenCreateWatchman" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "WatchmenCreateWatchmanInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "watchmenCreateWatchman" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [] }] } }] });

export const WatchmenUpdateShiftDocument: DocumentNode<WatchmenUpdateShiftMutation, WatchmenUpdateShiftMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "WatchmenUpdateShift" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "WatchmenUpdateShiftInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "shift" }, "name": { "kind": "Name", "value": "watchmenUpdateShift" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Shift" }, "directives": [] }] } }] } }, ...ShiftFragmentDoc.definitions] });

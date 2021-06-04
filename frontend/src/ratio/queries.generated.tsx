import * as Types from '../apollo/types.generated';

import { PageInfoFragment, GenericErrorFragment, ValidationErrorFragment } from '../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { PageInfoFragmentDoc, GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../apollo/common-fragments.generated';
export type TrainingForPickerFragment = (
  { __typename: 'RatioTraining' }
  & Pick<Types.RatioTraining, 'id' | 'slug' | 'name'>
);

export type RatioPaymentFragment = (
  { __typename: 'RatioPayment' }
  & Pick<Types.RatioPayment, 'id' | 'amount' | 'payment_type' | 'status' | 'fiscalization_status'>
);

export type RatioTicketFragment = (
  { __typename: 'RatioTicket' }
  & Pick<Types.RatioTicket, 'id' | 'email' | 'first_name' | 'last_name' | 'payment_amount' | 'status' | 'ticket_class' | 'notion_link' | 'need_notion_link' | 'created'>
  & { payments: Array<(
    { __typename: 'RatioPayment' }
    & RatioPaymentFragment
  )>, ticket_type?: Types.Maybe<(
    { __typename: 'RatioTicketType' }
    & Pick<Types.RatioTicketType, 'id' | 'name'>
  )> }
);

export type RatioPromocodeFragment = (
  { __typename: 'RatioPromocode' }
  & Pick<Types.RatioPromocode, 'id' | 'code' | 'discount' | 'discount_percent' | 'uses_max' | 'uses_count' | 'for_email'>
);

export type RatioPromocodeConnectionFragment = (
  { __typename: 'RatioPromocodeConnection' }
  & { pageInfo: (
    { __typename: 'PageInfo' }
    & PageInfoFragment
  ), edges: Array<(
    { __typename: 'RatioPromocodeEdge' }
    & { node: (
      { __typename: 'RatioPromocode' }
      & RatioPromocodeFragment
    ) }
  )> }
);

export type RatioTicketTypeFragment = (
  { __typename: 'RatioTicketType' }
  & Pick<Types.RatioTicketType, 'id' | 'price' | 'name' | 'discount_by_email' | 'discount_percent_by_email' | 'promocodes_count'>
  & { promocodes: (
    { __typename: 'RatioPromocodeConnection' }
    & RatioPromocodeConnectionFragment
  ) }
);

export type RatioTicketType_SummaryFragment = (
  { __typename: 'RatioTicketType' }
  & Pick<Types.RatioTicketType, 'id' | 'price' | 'name'>
);

export type RatioTrainerFragment = (
  { __typename: 'RatioTrainer' }
  & Pick<Types.RatioTrainer, 'id' | 'short_name' | 'long_name'>
);

export type ActivityFragment = (
  { __typename: 'RatioActivity' }
  & Pick<Types.RatioActivity, 'id' | 'time' | 'activity_type' | 'name' | 'location'>
  & { trainer?: Types.Maybe<(
    { __typename: 'RatioTrainer' }
    & RatioTrainerFragment
  )> }
);

export type TrainingDayFragment = (
  { __typename: 'RatioTrainingDay' }
  & Pick<Types.RatioTrainingDay, 'id' | 'date'>
  & { activities: Array<(
    { __typename: 'RatioActivity' }
    & ActivityFragment
  )> }
);

export type TrainingWithScheduleFragment = (
  { __typename: 'RatioTraining' }
  & { schedule: Array<(
    { __typename: 'RatioTrainingDay' }
    & TrainingDayFragment
  )> }
  & RatioTrainingFragment
);

export type RatioTraining_SummaryFragment = (
  { __typename: 'RatioTraining' }
  & Pick<Types.RatioTraining, 'id' | 'slug' | 'training_type' | 'name' | 'date' | 'telegram_link' | 'tickets_count' | 'total_income'>
  & { ticket_types: Array<(
    { __typename: 'RatioTicketType' }
    & RatioTicketType_SummaryFragment
  )> }
);

export type RatioTrainingFragment = (
  { __typename: 'RatioTraining' }
  & Pick<Types.RatioTraining, 'id' | 'slug' | 'training_type' | 'name' | 'date' | 'telegram_link' | 'tickets_count' | 'total_income' | 'discount_by_email' | 'discount_percent_by_email' | 'promocode_email' | 'new_ticket_email' | 'notion_created_email' | 'promocodes_count'>
  & { promocodes: (
    { __typename: 'RatioPromocodeConnection' }
    & RatioPromocodeConnectionFragment
  ), tickets: Array<(
    { __typename: 'RatioTicket' }
    & RatioTicketFragment
  )>, ticket_types: Array<(
    { __typename: 'RatioTicketType' }
    & RatioTicketTypeFragment
  )>, schedule: Array<(
    { __typename: 'RatioTrainingDay' }
    & Pick<Types.RatioTrainingDay, 'id'>
  )> }
);

export type RatioTrainingsForPickerQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type RatioTrainingsForPickerQuery = (
  { __typename: 'Query' }
  & { trainings: (
    { __typename: 'RatioTrainingConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename: 'RatioTrainingEdge' }
      & { node: (
        { __typename: 'RatioTraining' }
        & TrainingForPickerFragment
      ) }
    )> }
  ) }
);

export type RatioTrainingWithScheduleQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type RatioTrainingWithScheduleQuery = (
  { __typename: 'Query' }
  & { training: (
    { __typename: 'RatioTraining' }
    & TrainingWithScheduleFragment
  ) }
);

export type RatioTrainersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RatioTrainersQuery = (
  { __typename: 'Query' }
  & { trainers: Array<(
    { __typename: 'RatioTrainer' }
    & RatioTrainerFragment
  )> }
);

export type RatioTrainingEmailPrototypeQueryVariables = Types.Exact<{
  training_id: Types.Scalars['ID'];
  type: Types.Scalars['String'];
}>;


export type RatioTrainingEmailPrototypeQuery = (
  { __typename: 'Query' }
  & { content: Types.Query['ratioTrainingEmailPrototype'] }
);

export type RatioAddTicketMutationVariables = Types.Exact<{
  input: Types.RatioAddTicketInput;
}>;


export type RatioAddTicketMutation = (
  { __typename: 'Mutation' }
  & { ratioAddTicket: (
    { __typename: 'RatioTicket' }
    & RatioTicketFragment
  ) }
);

export type UpdateRatioTicketMutationVariables = Types.Exact<{
  input: Types.UpdateRatioTicketInput;
}>;


export type UpdateRatioTicketMutation = (
  { __typename: 'Mutation' }
  & { updateRatioTicket: (
    { __typename: 'RatioTicket' }
    & RatioTicketFragment
  ) }
);

export type RatioPaymentAddMutationVariables = Types.Exact<{
  input: Types.RatioPaymentAddInput;
}>;


export type RatioPaymentAddMutation = (
  { __typename: 'Mutation' }
  & { ratioPaymentAdd: (
    { __typename: 'RatioPaymentAddResult' }
    & { payment: (
      { __typename: 'RatioPayment' }
      & RatioPaymentFragment
    ) }
  ) }
);

export type RatioPaymentDeleteMutationVariables = Types.Exact<{
  payment_id: Types.Scalars['ID'];
}>;


export type RatioPaymentDeleteMutation = (
  { __typename: 'Mutation' }
  & { ratioPaymentDelete: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type RatioPaymentSetStatusMutationVariables = Types.Exact<{
  input: Types.RatioPaymentSetStatusInput;
}>;


export type RatioPaymentSetStatusMutation = (
  { __typename: 'Mutation' }
  & { ratioPaymentSetStatus: (
    { __typename: 'RatioPaymentSetStatusResult' }
    & { payment: (
      { __typename: 'RatioPayment' }
      & RatioPaymentFragment
    ) }
  ) }
);

export type RatioPaymentFiscalizeMutationVariables = Types.Exact<{
  payment_id: Types.Scalars['ID'];
}>;


export type RatioPaymentFiscalizeMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'ratioPaymentFiscalize'>
);

export type RatioPaymentFiscalizedManuallyMutationVariables = Types.Exact<{
  payment_id: Types.Scalars['ID'];
}>;


export type RatioPaymentFiscalizedManuallyMutation = (
  { __typename: 'Mutation' }
  & { ratioPaymentFiscalizedManually: (
    { __typename: 'RatioPaymentFiscalizedManuallyResult' }
    & { payment: (
      { __typename: 'RatioPayment' }
      & RatioPaymentFragment
    ) }
  ) }
);

export type RatioTrainingAddDayMutationVariables = Types.Exact<{
  input: Types.RatioTrainingAddDayInput;
}>;


export type RatioTrainingAddDayMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'ratioTrainingAddDay'>
);

export type RatioTrainingCopyScheduleFromMutationVariables = Types.Exact<{
  input: Types.RatioTrainingCopyScheduleFromInput;
}>;


export type RatioTrainingCopyScheduleFromMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'ratioTrainingCopyScheduleFrom'>
);

export type RatioTrainingSendEmailMutationVariables = Types.Exact<{
  input: Types.RatioTrainingSendEmailInput;
}>;


export type RatioTrainingSendEmailMutation = (
  { __typename: 'Mutation' }
  & { email: (
    { __typename: 'RatioTrainingSendEmailResult' }
    & Pick<Types.RatioTrainingSendEmailResult, 'draft_link'>
  ) }
);

export type RatioTrainingSyncParticipantsToMailchimpMutationVariables = Types.Exact<{
  training_id: Types.Scalars['ID'];
}>;


export type RatioTrainingSyncParticipantsToMailchimpMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'ratioTrainingSyncParticipantsToMailchimp'>
);

export const TrainingForPickerFragmentDoc: DocumentNode<TrainingForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrainingForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTraining"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]};
export const RatioPromocodeFragmentDoc: DocumentNode<RatioPromocodeFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioPromocode"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioPromocode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"uses_max"}},{"kind":"Field","name":{"kind":"Name","value":"uses_count"}},{"kind":"Field","name":{"kind":"Name","value":"for_email"}}]}}]};
export const RatioPromocodeConnectionFragmentDoc: DocumentNode<RatioPromocodeConnectionFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioPromocodeConnection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioPromocodeConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioPromocode"}}]}}]}}]}},...PageInfoFragmentDoc.definitions,...RatioPromocodeFragmentDoc.definitions]};
export const RatioPaymentFragmentDoc: DocumentNode<RatioPaymentFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioPayment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioPayment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fiscalization_status"}}]}}]};
export const RatioTicketFragmentDoc: DocumentNode<RatioTicketFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTicket"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"payment_amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticket_class"}},{"kind":"Field","name":{"kind":"Name","value":"notion_link"}},{"kind":"Field","name":{"kind":"Name","value":"need_notion_link"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioPayment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticket_type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},...RatioPaymentFragmentDoc.definitions]};
export const RatioTicketTypeFragmentDoc: DocumentNode<RatioTicketTypeFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTicketType"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTicketType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"discount_by_email"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent_by_email"}},{"kind":"Field","name":{"kind":"Name","value":"promocodes_count"}},{"kind":"Field","name":{"kind":"Name","value":"promocodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioPromocodeConnection"}}]}}]}},...RatioPromocodeConnectionFragmentDoc.definitions]};
export const RatioTrainingFragmentDoc: DocumentNode<RatioTrainingFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTraining"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTraining"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"training_type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"telegram_link"}},{"kind":"Field","name":{"kind":"Name","value":"tickets_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_income"}},{"kind":"Field","name":{"kind":"Name","value":"discount_by_email"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent_by_email"}},{"kind":"Field","name":{"kind":"Name","value":"promocode_email"}},{"kind":"Field","name":{"kind":"Name","value":"new_ticket_email"}},{"kind":"Field","name":{"kind":"Name","value":"notion_created_email"}},{"kind":"Field","name":{"kind":"Name","value":"promocodes_count"}},{"kind":"Field","name":{"kind":"Name","value":"promocodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioPromocodeConnection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTicket"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticket_types"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTicketType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},...RatioPromocodeConnectionFragmentDoc.definitions,...RatioTicketFragmentDoc.definitions,...RatioTicketTypeFragmentDoc.definitions]};
export const RatioTrainerFragmentDoc: DocumentNode<RatioTrainerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTrainer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTrainer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"short_name"}},{"kind":"Field","name":{"kind":"Name","value":"long_name"}}]}}]};
export const ActivityFragmentDoc: DocumentNode<ActivityFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Activity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioActivity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"activity_type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"trainer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTrainer"}}]}}]}},...RatioTrainerFragmentDoc.definitions]};
export const TrainingDayFragmentDoc: DocumentNode<TrainingDayFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrainingDay"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTrainingDay"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Activity"}}]}}]}},...ActivityFragmentDoc.definitions]};
export const TrainingWithScheduleFragmentDoc: DocumentNode<TrainingWithScheduleFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrainingWithSchedule"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTraining"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTraining"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrainingDay"}}]}}]}},...RatioTrainingFragmentDoc.definitions,...TrainingDayFragmentDoc.definitions]};
export const RatioTicketType_SummaryFragmentDoc: DocumentNode<RatioTicketType_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTicketType_Summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTicketType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]};
export const RatioTraining_SummaryFragmentDoc: DocumentNode<RatioTraining_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTraining_Summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTraining"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"training_type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"telegram_link"}},{"kind":"Field","name":{"kind":"Name","value":"tickets_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_income"}},{"kind":"Field","name":{"kind":"Name","value":"ticket_types"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTicketType_Summary"}}]}}]}},...RatioTicketType_SummaryFragmentDoc.definitions]};
export const RatioTrainingsForPickerDocument: DocumentNode<RatioTrainingsForPickerQuery, RatioTrainingsForPickerQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTrainingsForPicker" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "trainings" }, "name": { "kind": "Name", "value": "ratioTrainings" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "eternal" }, "value": { "kind": "BooleanValue", "value": false } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "PageInfo" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TrainingForPicker" } }] } }] } }] } }] } }, ...PageInfoFragmentDoc.definitions, ...TrainingForPickerFragmentDoc.definitions] });

export const RatioTrainingWithScheduleDocument: DocumentNode<RatioTrainingWithScheduleQuery, RatioTrainingWithScheduleQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTrainingWithSchedule" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "training" }, "name": { "kind": "Name", "value": "ratioTrainingBySlug" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "slug" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TrainingWithSchedule" } }] } }] } }, ...TrainingWithScheduleFragmentDoc.definitions] });

export const RatioTrainersDocument: DocumentNode<RatioTrainersQuery, RatioTrainersQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTrainers" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "trainers" }, "name": { "kind": "Name", "value": "ratioTrainersAll" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTrainer" } }] } }] } }, ...RatioTrainerFragmentDoc.definitions] });

export const RatioTrainingEmailPrototypeDocument: DocumentNode<RatioTrainingEmailPrototypeQuery, RatioTrainingEmailPrototypeQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTrainingEmailPrototype" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "training_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "type" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "content" }, "name": { "kind": "Name", "value": "ratioTrainingEmailPrototype" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "training_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "training_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "type" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "type" } } }] }] } }] });

export const RatioAddTicketDocument: DocumentNode<RatioAddTicketMutation, RatioAddTicketMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioAddTicket" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioAddTicketInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioAddTicket" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicket" } }] } }] } }, ...RatioTicketFragmentDoc.definitions] });

export const UpdateRatioTicketDocument: DocumentNode<UpdateRatioTicketMutation, UpdateRatioTicketMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateRatioTicket" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateRatioTicketInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateRatioTicket" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicket" } }] } }] } }, ...RatioTicketFragmentDoc.definitions] });

export const RatioPaymentAddDocument: DocumentNode<RatioPaymentAddMutation, RatioPaymentAddMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioPaymentAdd" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioPaymentAddInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioPaymentAdd" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "payment" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioPayment" } }] } }] } }] } }, ...RatioPaymentFragmentDoc.definitions] });

export const RatioPaymentDeleteDocument: DocumentNode<RatioPaymentDeleteMutation, RatioPaymentDeleteMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioPaymentDelete" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "payment_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioPaymentDelete" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "payment_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "payment_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }] } }] });

export const RatioPaymentSetStatusDocument: DocumentNode<RatioPaymentSetStatusMutation, RatioPaymentSetStatusMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioPaymentSetStatus" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioPaymentSetStatusInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioPaymentSetStatus" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "payment" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioPayment" } }] } }] } }] } }, ...RatioPaymentFragmentDoc.definitions] });

export const RatioPaymentFiscalizeDocument: DocumentNode<RatioPaymentFiscalizeMutation, RatioPaymentFiscalizeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioPaymentFiscalize" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "payment_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioPaymentFiscalize" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "payment_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "payment_id" } } }] }] } }] });

export const RatioPaymentFiscalizedManuallyDocument: DocumentNode<RatioPaymentFiscalizedManuallyMutation, RatioPaymentFiscalizedManuallyMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioPaymentFiscalizedManually" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "payment_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioPaymentFiscalizedManually" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "payment_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "payment_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "payment" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioPayment" } }] } }] } }] } }, ...RatioPaymentFragmentDoc.definitions] });

export const RatioTrainingAddDayDocument: DocumentNode<RatioTrainingAddDayMutation, RatioTrainingAddDayMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioTrainingAddDay" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioTrainingAddDayInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioTrainingAddDay" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }] }] } }] });

export const RatioTrainingCopyScheduleFromDocument: DocumentNode<RatioTrainingCopyScheduleFromMutation, RatioTrainingCopyScheduleFromMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioTrainingCopyScheduleFrom" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioTrainingCopyScheduleFromInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioTrainingCopyScheduleFrom" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }] }] } }] });

export const RatioTrainingSendEmailDocument: DocumentNode<RatioTrainingSendEmailMutation, RatioTrainingSendEmailMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioTrainingSendEmail" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioTrainingSendEmailInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "email" }, "name": { "kind": "Name", "value": "ratioTrainingSendEmail" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "draft_link" } }] } }] } }] });

export const RatioTrainingSyncParticipantsToMailchimpDocument: DocumentNode<RatioTrainingSyncParticipantsToMailchimpMutation, RatioTrainingSyncParticipantsToMailchimpMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioTrainingSyncParticipantsToMailchimp" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "training_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioTrainingSyncParticipantsToMailchimp" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "training_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "training_id" } } }] }] } }] });

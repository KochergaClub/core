import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MailchimpSubscribeBlockFragment = (
  { __typename: 'MailchimpSubscribeBlock' }
  & Pick<Types.MailchimpSubscribeBlock, 'id'>
  & { mailchimp: (
    { __typename: 'MailchimpSubscribeBlockValue' }
    & Pick<Types.MailchimpSubscribeBlockValue, 'news' | 'events' | 'trainings'>
  ) }
);

export const MailchimpSubscribeBlockFragmentDoc: DocumentNode<MailchimpSubscribeBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MailchimpSubscribeBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MailchimpSubscribeBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"mailchimp"},"name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"news"}},{"kind":"Field","name":{"kind":"Name","value":"events"}},{"kind":"Field","name":{"kind":"Name","value":"trainings"}}]}}]}}]};
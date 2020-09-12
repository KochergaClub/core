import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type MailchimpSubscribeBlockFragment = (
  { __typename: 'MailchimpSubscribeBlock' }
  & Pick<Types.MailchimpSubscribeBlock, 'id'>
  & { mailchimp: (
    { __typename: 'MailchimpSubscribeBlockValue' }
    & Pick<Types.MailchimpSubscribeBlockValue, 'news' | 'events' | 'trainings'>
  ) }
);

export const MailchimpSubscribeBlockFragmentDoc = gql`
    fragment MailchimpSubscribeBlock on MailchimpSubscribeBlock {
  id
  mailchimp: value {
    news
    events
    trainings
  }
}
    `;
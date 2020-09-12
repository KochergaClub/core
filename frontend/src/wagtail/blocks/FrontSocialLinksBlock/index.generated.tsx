import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type FrontSocialLinksBlockFragment = (
  { __typename: 'FrontSocialLinksBlock' }
  & Pick<Types.FrontSocialLinksBlock, 'id'>
);

export const FrontSocialLinksBlockFragmentDoc = gql`
    fragment FrontSocialLinksBlock on FrontSocialLinksBlock {
  id
}
    `;
import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type BigContactsBlockFragment = (
  { __typename: 'BigContactsBlock' }
  & Pick<Types.BigContactsBlock, 'id'>
  & { contacts: (
    { __typename: 'BigContactsBlockValue' }
    & Pick<Types.BigContactsBlockValue, 'address' | 'phone' | 'email' | 'text'>
    & { map: (
      { __typename: 'WagtailGeo' }
      & Pick<Types.WagtailGeo, 'lat' | 'lng'>
    ) }
  ) }
);

export const BigContactsBlockFragmentDoc = gql`
    fragment BigContactsBlock on BigContactsBlock {
  id
  contacts: value {
    map {
      lat
      lng
    }
    address
    phone
    email
    text
  }
}
    `;
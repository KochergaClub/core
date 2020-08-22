import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type HeroFrontBlockFragment = (
  { __typename: 'HeroFrontBlock' }
  & Pick<Types.HeroFrontBlock, 'id'>
  & { hero: (
    { __typename: 'HeroFrontBlockValue' }
    & Pick<Types.HeroFrontBlockValue, 'title'>
    & { buttons: Array<(
      { __typename: 'HeroFrontBlock_buttonsValue' }
      & Pick<Types.HeroFrontBlock_ButtonsValue, 'title' | 'link'>
    )> }
  ) }
);

export const HeroFrontBlockFragmentDoc = gql`
    fragment HeroFrontBlock on HeroFrontBlock {
  id
  hero: value {
    title
    buttons {
      title
      link
    }
  }
}
    `;
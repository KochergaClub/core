import * as Types from './types.generated';

import gql from 'graphql-tag';

export type PageInfoFragment = (
  { __typename?: 'PageInfo' }
  & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
);

export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  hasNextPage
  hasPreviousPage
  startCursor
  endCursor
}
    `;
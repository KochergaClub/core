import { KochergaApolloClient } from '~/apollo/types';

import { CurrentUserQuery, CurrentUserDocument } from './queries.generated';

import { APIError } from '~/common/api';

interface Params {
  is_authenticated?: boolean;
  is_staff?: boolean;
  permissions?: string[];
}

// can be used in getInitialProps to check that the page should be rendered at all
export const requireAuth = async (
  client: KochergaApolloClient,
  params: Params
) => {
  const result = await client.query<CurrentUserQuery>({
    query: CurrentUserDocument,
  });

  if (!result.data) {
    throw new APIError('Expected query data', 500);
  }

  const currentUser = result.data.my.user;

  if (params.is_authenticated && !currentUser.is_authenticated) {
    throw new APIError('Need to be logged in', 403);
  }

  if (params.is_staff && !currentUser.is_staff) {
    throw new APIError('Need to be staff', 403);
  }

  if (params.permissions) {
    for (const permission of params.permissions) {
      if (!currentUser.permissions.includes(permission)) {
        throw new APIError(`Missing permission ${permission}`, 403);
      }
    }
  }
};

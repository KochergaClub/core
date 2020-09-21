import { KochergaApolloClient } from '~/apollo/types';
import { APIError } from '~/common/api';

import { NeedLoginError } from './errors';
import { CurrentUserDocument } from './queries.generated';

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
  const result = await client.query({
    query: CurrentUserDocument,
  });

  if (!result.data) {
    throw new APIError('Expected query data', 500);
  }

  const currentUser = result.data.my.user;

  if (!currentUser.is_authenticated) {
    throw new NeedLoginError();
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

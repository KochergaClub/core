import { useApolloClient } from '@apollo/react-hooks';
import {
  CurrentUserDocument,
  CurrentUserQuery,
} from '~/auth/queries.generated';

export default () => {
  const apolloClient = useApolloClient();
  const result = apolloClient.cache.readQuery<CurrentUserQuery>({
    query: CurrentUserDocument,
  });
  if (!result) {
    throw new Error('Expected CurrentUser data in cache');
  }
  return result.my.user;
};

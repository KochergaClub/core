import { useCurrentUserQuery } from '~/auth/queries.generated';

const useUser = () => {
  const result = useCurrentUserQuery({
    fetchPolicy: 'cache-only',
  });
  if (!result.data) {
    throw new Error('Expected CurrentUser data in cache');
  }
  return result.data.my.user;
};

export default useUser;

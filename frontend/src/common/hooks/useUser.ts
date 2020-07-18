import { useCurrentUserQuery } from '~/auth/queries.generated';

export default () => {
  const result = useCurrentUserQuery({
    fetchPolicy: 'cache-only',
  });
  if (!result.data) {
    throw new Error('Expected CurrentUser data in cache');
  }
  return result.data.my.user;
};

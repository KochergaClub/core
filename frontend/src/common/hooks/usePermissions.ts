import useUser from './useUser';

const usePermissions = (permissions: string[]) => {
  const user = useUser();

  const result: boolean[] = [];
  for (const permission of permissions) {
    result.push(user.permissions.includes(permission));
  }
  return result;
};

export default usePermissions;

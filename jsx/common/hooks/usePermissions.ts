import { useSelector } from 'react-redux';

import { selectUser } from '~/core/selectors';

const usePermissions = (permissions: string[]) => {
  const user = useSelector(selectUser);

  const result: boolean[] = [];
  for (const permission of permissions) {
    result.push(user.permissions.includes(permission));
  }
  return result;
};

export default usePermissions;

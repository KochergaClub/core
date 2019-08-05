import { useContext } from 'react';

import GlobalContext from '~/components/GlobalContext';

const usePermissions = (permissions: string[]) => {
  const { user } = useContext(GlobalContext);

  const result: boolean[] = [];
  for (const permission of permissions) {
    result.push(user.permissions.includes(permission));
  }
  return result;
};

export default usePermissions;

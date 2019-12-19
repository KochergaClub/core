import { createResourceFeature } from '~/redux/features';

import { Permission } from '../types';

const feature = createResourceFeature<Permission>({
  name: 'audit/permissions',
  endpoint: 'auth/permissions',
});

/**************** thunks **************/
export const loadPermissions = feature.thunks.load;

/**************** selectors **************/
export const selectPermissions = feature.selectors.asList;

export default feature.slice;

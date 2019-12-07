import { combineReducers } from 'redux';

import permissions from './features/permissions';
import groups from './features/groups';

export default combineReducers({
  groups: groups.reducer,
  permissions: permissions.reducer,
});

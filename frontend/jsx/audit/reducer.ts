import { combineReducers } from 'redux';

import { permissionsSlice, groupsSlice } from './slices';

export default combineReducers({
  groups: groupsSlice.reducer,
  permissions: permissionsSlice.reducer,
});

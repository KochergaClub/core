import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { groupsSlice, permissionsSlice } from './slices';
import { Group, Permission } from './types';

export const selectGroups: Selector<State, Group[]> = createSelector(
  state => state.audit.groups,
  groupsSlice.selectors.selectAll
);

export const selectPermissions: Selector<State, Permission[]> = createSelector(
  state => state.audit.permissions,
  permissionsSlice.selectors.selectAll
);

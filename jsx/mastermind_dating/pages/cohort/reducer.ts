import React from 'react';

import { Cohort, User, Group } from '../../types';

interface ReplaceCohortAction {
  type: 'REPLACE_COHORT';
  payload: {
    cohort: Cohort;
  };
}

interface ReplaceUsersAction {
  type: 'REPLACE_USERS';
  payload: {
    users: User[];
  };
}

interface ReplaceGroupsAction {
  type: 'REPLACE_GROUPS';
  payload: {
    groups: Group[];
  };
}

type Action = ReplaceCohortAction | ReplaceUsersAction | ReplaceGroupsAction;

interface Store {
  cohort: Cohort;
  users: User[];
  groups: Group[];
}

export const reducer = (store: Store, action: Action): Store => {
  switch (action.type) {
    case 'REPLACE_COHORT':
      return {
        ...store,
        cohort: action.payload.cohort,
      };
    case 'REPLACE_USERS':
      return {
        ...store,
        users: action.payload.users,
      };
    case 'REPLACE_GROUPS':
      return {
        ...store,
        groups: action.payload.groups,
      };
  }
};

type MastermindContextShape = (a: Action) => void;

export const MastermindContext = React.createContext<MastermindContextShape>(
  () => null
);

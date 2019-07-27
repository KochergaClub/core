import React from 'react';

import { Cohort, User } from '../../types';

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

type Action = ReplaceCohortAction | ReplaceUsersAction;

interface Store {
  cohort: Cohort;
  users: User[];
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
  }
};

type MastermindContextShape = (a: Action) => void;

export const MastermindContext = React.createContext<MastermindContextShape>(
  () => null
);

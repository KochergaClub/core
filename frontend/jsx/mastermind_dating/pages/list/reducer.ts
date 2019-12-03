import React from 'react';

import { Cohort } from '../../types';

interface ReplaceCohortsAction {
  type: 'REPLACE_COHORTS_ACTION';
  payload: {
    cohorts: Cohort[];
  };
}

type Action = ReplaceCohortsAction;

interface Store {
  cohorts: Cohort[];
}

export const reducer = (store: Store, action: Action): Store => {
  switch (action.type) {
    case 'REPLACE_COHORTS_ACTION':
      return {
        ...store,
        cohorts: action.payload.cohorts,
      };
    default:
      return store;
  }
};

type MastermindContextShape = (a: Action) => void;

export const MastermindContext = React.createContext<MastermindContextShape>(
  () => null
);

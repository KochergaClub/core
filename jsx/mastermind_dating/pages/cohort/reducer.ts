import React from 'react';

import { Cohort } from '../../types';

interface ReplaceCohortAction {
  type: 'REPLACE_COHORT';
  payload: {
    cohort: Cohort;
  };
}

type Action = ReplaceCohortAction;

interface Store {
  cohort: Cohort;
}

export const reducer = (store: Store, action: Action): Store => {
  switch (action.type) {
    case 'REPLACE_COHORT':
      return {
        ...store,
        cohort: action.payload.cohort,
      };
    default:
      return store;
  }
};

type MastermindContextShape = (a: Action) => void;

export const MastermindContext = React.createContext<MastermindContextShape>(
  () => null
);

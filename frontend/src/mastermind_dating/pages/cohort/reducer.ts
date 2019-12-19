import React from 'react';

import { Cohort, Participant, Group } from '../../types';

interface ReplaceCohortAction {
  type: 'REPLACE_COHORT';
  payload: {
    cohort: Cohort;
  };
}

interface ReplaceParticipantsAction {
  type: 'REPLACE_PARTICIPANTS';
  payload: {
    participants: Participant[];
  };
}

interface ReplaceGroupsAction {
  type: 'REPLACE_GROUPS';
  payload: {
    groups: Group[];
  };
}

type Action =
  | ReplaceCohortAction
  | ReplaceParticipantsAction
  | ReplaceGroupsAction;

interface Store {
  cohort: Cohort;
  participants: Participant[];
  groups: Group[];
}

export const reducer = (store: Store, action: Action): Store => {
  switch (action.type) {
    case 'REPLACE_COHORT':
      return {
        ...store,
        cohort: action.payload.cohort,
      };
    case 'REPLACE_PARTICIPANTS':
      return {
        ...store,
        participants: action.payload.participants,
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

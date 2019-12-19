import React from 'react';

import { TrainingDay } from '../types';

interface Store {
  schedule: TrainingDay[];
}

interface ReplaceScheduleAction {
  type: 'REPLACE_SCHEDULE';
  payload: {
    schedule: TrainingDay[];
  };
}

interface SetTrainerAction {
  type: 'SET_TRAINER';
  payload: {
    activity_id: number;
    trainer: string;
  };
}

interface UnsetTrainerAction {
  type: 'UNSET_TRAINER';
  payload: {
    activity_id: number;
  };
}

type Action = ReplaceScheduleAction | SetTrainerAction | UnsetTrainerAction;

export const reducer = (store: Store, action: Action): Store => {
  switch (action.type) {
    case 'REPLACE_SCHEDULE':
      const schedule = action.payload.schedule;
      return {
        ...store,
        schedule,
      };
    case 'SET_TRAINER':
      return {
        ...store,
        schedule: store.schedule.map(day => ({
          ...day,
          schedule: day.schedule.map(activity =>
            activity.id === action.payload.activity_id
              ? {
                  ...activity,
                  trainer: action.payload.trainer,
                }
              : activity
          ),
        })),
      };
    case 'UNSET_TRAINER':
      return {
        ...store,
        // FIXME - copypaste
        schedule: store.schedule.map(day => ({
          ...day,
          schedule: day.schedule.map(activity =>
            activity.id === action.payload.activity_id
              ? {
                  ...activity,
                  trainer: '',
                }
              : activity
          ),
        })),
      };
    default:
      return store;
  }
};

interface ContextShape {
  dispatch: React.Dispatch<Action>;
}

export const ScheduleContext = React.createContext<ContextShape>({
  dispatch: () => null,
});

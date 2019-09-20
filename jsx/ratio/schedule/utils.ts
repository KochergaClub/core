import React from 'react';

import { ActivityType, DayScheduleType } from '../types';

export function groupByDay(schedule: ActivityType[]) {
  const scheduleByDay: { [key: number]: ActivityType[] } = {};
  for (const activity of schedule) {
    if (!scheduleByDay[activity.day]) {
      scheduleByDay[activity.day] = [];
    }
    scheduleByDay[activity.day].push(activity);
  }

  const days = ((Object.keys(scheduleByDay) as unknown) as number[]).sort(
    (a, b) => a - b
  );

  const result: DayScheduleType[] = [];
  for (const day of days) {
    result.push({
      day,
      activities: scheduleByDay[day],
    });
  }
  return result;
}

interface Store {
  schedule: ActivityType[];
}

interface ReplaceScheduleAction {
  type: 'REPLACE_SCHEDULE';
  payload: {
    schedule: ActivityType[];
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
        schedule: store.schedule.map(activity =>
          activity.id === action.payload.activity_id
            ? {
                ...activity,
                trainer: action.payload.trainer,
              }
            : activity
        ),
      };
    case 'UNSET_TRAINER':
      return {
        ...store,
        schedule: store.schedule.map(activity =>
          activity.id === action.payload.activity_id
            ? {
                ...activity,
                trainer: '',
              }
            : activity
        ),
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

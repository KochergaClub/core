import React from 'react';

import { ActivityType } from '../types';

import { groupByDay } from './utils';
import DaySchedule from './single-column/DaySchedule';

interface Props {
  long_name: string;
  schedule: ActivityType[];
}

export default function SingleColumnSchedule({ schedule, long_name }: Props) {
  return (
    <div>
      {groupByDay(schedule).map(day_schedule => (
        <DaySchedule
          day_schedule={day_schedule}
          long_name={long_name}
          key={day_schedule.day}
        />
      ))}
    </div>
  );
}

import React from 'react';

import styled from 'styled-components';

import { ActivityType } from '../types';

import { groupByDay } from './utils';
import DaySchedule from './multi-column/DaySchedule';

interface Props {
  long_name: string;
  schedule: ActivityType[];
}

const Columns = styled.div`
  display: flex;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 20px;
  }
`;

export default function MultiColumnSchedule({ schedule, long_name }: Props) {
  return (
    <Columns>
      {groupByDay(schedule).map(day_schedule => (
        <DaySchedule
          day_schedule={day_schedule}
          long_name={long_name}
          key={day_schedule.day}
        />
      ))}
    </Columns>
  );
}

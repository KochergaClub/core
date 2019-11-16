import React from 'react';

import styled from 'styled-components';

import { TrainingDay } from '../types';

import DaySchedule from './multi-column/DaySchedule';

interface Props {
  long_name: string;
  schedule: TrainingDay[];
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
      {schedule.map((day, i) => (
        <DaySchedule
          day_schedule={day}
          long_name={long_name}
          key={i}
          index={i + 1}
        />
      ))}
    </Columns>
  );
}

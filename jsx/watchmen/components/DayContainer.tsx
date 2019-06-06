import React from 'react';

import { DaySchedule } from '../types';

import ShiftBox from './ShiftBox';

const DayContainer = ({ daySchedule }: { daySchedule: DaySchedule }) => {
  return (
    <div>
      {daySchedule.map(shift => (
        <ShiftBox key={shift.shift} shift={shift} />
      ))}
    </div>
  );
};

export default DayContainer;

import React from 'react';

import { DaySchedule, SHIFT_TYPES } from '../types';

import ShiftBox from './ShiftBox';

const DayContainer = ({ daySchedule }: { daySchedule: DaySchedule }) => {
  return (
    <div>
      {SHIFT_TYPES.map(shiftType => (
        <ShiftBox key={shiftType} item={daySchedule[shiftType]} />
      ))}
    </div>
  );
};

export default DayContainer;

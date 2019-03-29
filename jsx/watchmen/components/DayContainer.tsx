import React from 'react';

import { DaySchedule, SHIFTS } from '../types';

import ShiftBox from './ShiftBox';

const DayContainer = ({ daySchedule }: { daySchedule: DaySchedule }) => {
  return (
    <div>
      {SHIFTS.map(shift => <ShiftBox key={shift} item={daySchedule[shift]} />)}
    </div>
  );
};

export default DayContainer;

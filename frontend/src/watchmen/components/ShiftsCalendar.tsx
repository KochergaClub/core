import { useMemo } from 'react';
import { format, eachDayOfInterval } from 'date-fns';

import Calendar from './Calendar';
import DayContainer from './DayContainer';

import { ShiftFragment } from '../queries.generated';

export const SHIFT_TYPES = ['MORNING', 'MIDDAY', 'EVENING', 'NIGHT'];

export interface Schedule {
  [date: string]: ShiftFragment[];
}

export const shifts2schedule = (
  shifts: ShiftFragment[],
  fromDate: Date,
  toDate: Date
): Schedule => {
  const schedule: Schedule = {};

  for (const date of eachDayOfInterval({ start: fromDate, end: toDate })) {
    const key = format(date, 'yyyy-MM-dd');
    schedule[key] = [];
  }

  shifts.forEach(shift => {
    if (!(shift.date in schedule)) {
      return;
    }
    // Day schedule can be unsorted by shift type after this step or miss some types.
    schedule[shift.date].push(shift);
  });

  Object.keys(schedule).forEach(date => {
    const daySchedule = schedule[date];
    const shiftType2shift: { [key: string]: ShiftFragment } = {};
    daySchedule.forEach(shift => {
      shiftType2shift[shift.shift] = shift;
    });

    schedule[date] = SHIFT_TYPES.map(shiftType => {
      return (
        shiftType2shift[shiftType] || {
          date,
          shift: shiftType,
          watchman: null,
          is_night: false,
        }
      );
    });
  });
  // Now all day schedules are fully populated and sorted.

  return schedule;
};

interface Props {
  shifts: ShiftFragment[];
  fromDate: Date;
  toDate: Date;
}

const ShiftsCalendar: React.FC<Props> = ({ shifts, fromDate, toDate }) => {
  const schedule = useMemo(() => shifts2schedule(shifts, fromDate, toDate), [
    shifts,
    fromDate,
    toDate,
  ]);

  const renderDay = (date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    return <DayContainer shifts={schedule[key]} />;
  };

  return <Calendar fromDate={fromDate} toDate={toDate} renderDay={renderDay} />;
};

export default ShiftsCalendar;

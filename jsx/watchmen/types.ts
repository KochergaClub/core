export interface Watchman {
  id: number;
  short_name: string;
  color: string;
}

export interface Shift {
  date: string;
  shift: string;
  watchman: Watchman | null;
  is_night: boolean;
}

export const SHIFT_TYPES = ['MORNING', 'MIDDAY', 'EVENING', 'NIGHT'];

export type DaySchedule = Shift[];
type Schedule = { [date: string]: DaySchedule };

export const shifts2schedule = (shifts: Shift[]): Schedule => {
  const schedule: Schedule = {};

  shifts.forEach(shift => {
    if (!(shift.date in schedule)) {
      schedule[shift.date] = [];
    }
    // Day schedule can be unsorted by shift type after this step or miss some types.
    schedule[shift.date].push(shift);
  });

  Object.keys(schedule).forEach(date => {
    const daySchedule = schedule[date];
    const shiftType2shift = {};
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

export const scheduleDispatch = (
  schedule: Schedule,
  shift: Shift
): Schedule => {
  return {
    ...schedule,
    [shift.date]: schedule[shift.date].map(existingShift => {
      return existingShift.shift === shift.shift ? shift : existingShift;
    }),
  };
};

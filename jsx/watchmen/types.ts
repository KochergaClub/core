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

export type DaySchedule = { [s: string]: Shift };
type Schedule = { [date: string]: DaySchedule };

export const shifts2schedule = (shifts: Shift[]): Schedule => {
  const schedule: Schedule = {};

  shifts.forEach(shift => {
    if (!(shift.date in schedule)) {
      schedule[shift.date] = {};
    }
    schedule[shift.date][shift.shift] = shift;
  });

  Object.keys(schedule).forEach(date => {
    SHIFT_TYPES.forEach(shiftType => {
      if (!schedule[date][shiftType]) {
        schedule[date][shiftType] = {
          date,
          shift: shiftType,
          watchman: null,
          is_night: false,
        };
      }
    });
  });

  return schedule;
};

export const scheduleDispatch = (
  schedule: Schedule,
  shift: Shift
): Schedule => {
  schedule[shift.date][shift.shift] = shift;
  return {
    ...schedule,
    [shift.date]: {
      ...schedule[shift.date],
      [shift.shift]: shift,
    },
  };
};

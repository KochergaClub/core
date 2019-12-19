export interface Watchman {
  id: number;
  member_id: number;
  color: string;
  short_name: string;
  is_current: boolean;
  grade_id?: number;
  priority: number;
}

export interface Shift {
  date: string;
  shift: string;
  watchman: Watchman | null;
  is_night: boolean;
}

export const SHIFT_TYPES = ['MORNING', 'MIDDAY', 'EVENING', 'NIGHT'];

export type DaySchedule = Shift[];
export interface Schedule {
  [date: string]: DaySchedule;
}

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
    const shiftType2shift: { [key: string]: Shift } = {};
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

export type DatesWindow = [Date, Date];

export interface Grade {
  id: number;
  code: string;
  multiplier: number;
}

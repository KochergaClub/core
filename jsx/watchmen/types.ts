export interface StaffMember {
  id: number;
  short_name: string;
  color: string;
  is_current: boolean;
  role: string;
}

export interface Shift {
  date: string;
  shift: string;
  watchman: StaffMember | null;
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

interface UpdateShiftAction {
  type: 'UPDATE_SHIFT';
  payload: {
    shift: Shift;
  };
}

interface ReplaceScheduleAction {
  type: 'REPLACE_SCHEDULE';
  payload: {
    schedule: Schedule;
  };
}

type Action = UpdateShiftAction | ReplaceScheduleAction;

export const scheduleReducer = (
  schedule: Schedule,
  action: Action
): Schedule => {
  switch (action.type) {
    case 'UPDATE_SHIFT':
      const shift = action.payload.shift;
      return {
        ...schedule,
        [shift.date]: schedule[shift.date].map(existingShift => {
          return existingShift.shift === shift.shift ? shift : existingShift;
        }),
      };
    case 'REPLACE_SCHEDULE':
      return {
        ...action.payload.schedule,
      };
    default:
      return schedule;
  }
};

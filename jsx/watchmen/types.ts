import moment from 'moment';

export interface Watchman {
  short_name: string;
  color: string;
}

export interface Shift {
  date: string;
  shift: string;
  watchman?: Watchman;
  is_night: boolean;
}

export const SHIFT_TYPES = ['MORNING', 'MIDDAY', 'EVENING', 'NIGHT'];

export type DaySchedule = { [s: string]: Shift };

export class Schedule {
  daySchedules: { [date: string]: DaySchedule } = {};

  constructor(shifts: Shift[]) {
    shifts.forEach(shift => {
      if (!(shift.date in this.daySchedules)) {
        this.daySchedules[shift.date] = {};
      }
      this.daySchedules[shift.date][shift.shift] = shift;
    });

    Object.keys(this.daySchedules).forEach(date => {
      SHIFT_TYPES.forEach(shiftType => {
        if (!this.daySchedules[date][shiftType]) {
          this.daySchedules[date][shiftType] = {
            date,
            shift: shiftType,
            watchman: null,
            is_night: false,
          };
        }
      });
    });
  }

  itemsByDate(d: moment.Moment): DaySchedule {
    return this.daySchedules[d.format('YYYY-MM-DD')];
  }
}

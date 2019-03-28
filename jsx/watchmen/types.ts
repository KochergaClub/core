import moment from 'moment';

export interface ScheduleItem {
  date: string;
  shift: string;
  watchman: string;
  color?: string;
}

export interface Watchman {
  short_name: string;
  color: string;
}

export const SHIFTS = ['MORNING', 'MIDDAY', 'EVENING', 'NIGHT'];

export type DaySchedule = { [s: string]: ScheduleItem };

export class Schedule {
  daySchedules: { [date: string]: DaySchedule } = {};

  constructor(items: ScheduleItem[]) {
    items.forEach(item => {
      if (!(item.date in this.daySchedules)) {
        this.daySchedules[item.date] = {};
      }
      this.daySchedules[item.date][item.shift] = item;
    });

    Object.keys(this.daySchedules).forEach(date => {
      SHIFTS.forEach(shift => {
        if (!this.daySchedules[date][shift]) {
          this.daySchedules[date][shift] = {
            date,
            shift,
            watchman: '',
          };
        }
      });
    });
  }

  itemsByDate(d: moment.Moment): DaySchedule {
    return this.daySchedules[d.format('YYYY-MM-DD')];
  }
}

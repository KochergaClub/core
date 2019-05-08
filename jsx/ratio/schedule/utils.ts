import { ActivityType, DayScheduleType } from '../types';

export function groupByDay(schedule: ActivityType[]) {
  const scheduleByDay: { [key: number]: ActivityType[] } = {};
  for (const activity of schedule) {
    if (!scheduleByDay[activity.day]) {
      scheduleByDay[activity.day] = [];
    }
    scheduleByDay[activity.day].push(activity);
  }

  const days = ((Object.keys(scheduleByDay) as unknown) as number[]).sort(
    (a, b) => a - b
  );

  const result: DayScheduleType[] = [];
  for (const day of days) {
    result.push({
      day,
      activities: scheduleByDay[day],
    });
  }
  return result;
}

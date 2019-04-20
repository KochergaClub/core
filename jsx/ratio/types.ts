export interface ActivityType {
  day: number;
  time: string;
  activity_type: string;
  name: string;
  trainer: string;
}

export interface DayScheduleType {
  day: number;
  activities: ActivityType[];
}

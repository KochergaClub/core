export interface Training {
  name: string;
  long_name: string;
  date: string;
  salaries_paid: boolean;
}

export interface Ticket {
  email: string;
  first_name: string;
  last_name: string;
}

export interface ActivityType {
  day: number;
  time: string;
  activity_type: string;
  name: string;
  trainer: string;
  location?: string;
}

export interface DayScheduleType {
  day: number;
  activities: ActivityType[];
}

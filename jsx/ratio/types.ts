export interface Training {
  id: number;
  name: string;
  slug: string;
  long_name: string;
  date: string;
  salaries_paid: boolean;
  tickets_count: number;
  total_income: number;
}

export interface CreateTrainingParams {
  name: string;
  slug: string;
  date: string;
}

export interface Ticket {
  id: number;
  training: number;
  email: string;
  first_name: string;
  last_name: string;
  status: 'normal' | 'canceled';
  payment_amount: number;
  fiscalization_status: 'todo' | 'not_needed' | 'in_progress' | 'fiscalized';
}

export interface Trainer {
  id: number;
  short_name: string;
  long_name: string;
}

export interface ActivityType {
  id: number;
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

export interface Cohort {
  id: number;
  event_id?: string;
  event_title?: string;
  event_start?: string;
  send_emails: boolean;
}

export interface User {
  user_id: number;
  user: string;
  name?: string;
  desc: string;
  photo: string;
  voted_for: boolean;
  present: boolean;
}

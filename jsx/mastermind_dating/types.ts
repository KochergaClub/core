export interface Cohort {
  id: number;
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

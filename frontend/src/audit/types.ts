export interface User {
  id: number;
  email: string;
  staff_member?: number;
}

export interface Permission {
  id: number;
  name: string;
  user_set: User[];
}

export interface Group {
  id: number;
  name: string;
  permissions: number[];
  user_set: User[];
}

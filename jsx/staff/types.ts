export interface Member {
  id: number;
  user_id: number;
  full_name: string;
  short_name: string;
  email: string;
  role: string;
  color: string;
  is_current: boolean;
  slack_image?: string;
  slack_id?: string;
  vk?: string;
}

export interface ShortStaffMember {
  id: number;
  short_name: string;
  color: string;
}

export interface Member {
  id: number;
  full_name: string;
  short_name?: string;
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

export interface Customer {
  card_id: number;
  subscription_until?: string;
  last_visit?: string;
  total_spent: number;
  privacy_mode: string;
}

export interface Order {
  order_id: number;
  start_dt: string;
  end_dt: string;
}

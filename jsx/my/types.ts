import { PublicEvent } from '../events/types';

export type PrivacyMode = 'private' | 'public';

export interface Customer {
  card_id: number;
  subscription_until?: string;
  last_visit?: string;
  total_spent: number;
  privacy_mode: PrivacyMode;
}

export interface Order {
  order_id: number;
  start_dt: string;
  end_dt: string;
}

export interface MyTicket {
  event: PublicEvent;
}

export interface MailchimpMemberInterest {
  id: string;
  name: string;
  subscribed: boolean;
}

interface MySubscriptionStatusEmpty {
  status: 'none';
}

interface MySubscriptionStatusNonEmpty {
  status: 'subscribed' | 'unsubscribed' | 'pending';
  interests: MailchimpMemberInterest[];
}

export type MySubscriptionStatus =
  | MySubscriptionStatusNonEmpty
  | MySubscriptionStatusEmpty;

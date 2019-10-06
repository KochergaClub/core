export interface SubscribeChannel {
  id: number;
  slug: string;
}

export interface MailchimpInterest {
  id: number;
  interest_id: string;
  name: string;
  subscriber_count: number;
}

export interface MailchimpCategory {
  id: number;
  category_id: string;
  title: string;
  interests: MailchimpInterest[];
}

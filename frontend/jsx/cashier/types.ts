import { User } from '~/audit/types';

export interface Payment {
  id: number;
  amount: number;
  whom: User;
  comment: string;
  is_redeemed: boolean;
  created_dt: string;
  redeem_dt?: string;
}

export interface CreatePaymentParams {
  amount: number;
  whom_id: number;
  comment: string;
}

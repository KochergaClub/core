export interface Payment {
  id: number;
  amount: number;
  whom: string;
  comment: string;
  is_redeemed: boolean;
  created_dt: string;
  redeem_dt?: string;
}

export interface CreatePaymentParams {
  amount: number;
  whom: string;
  comment: string;
}

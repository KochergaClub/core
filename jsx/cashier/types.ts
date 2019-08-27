export interface Payment {
  id: number;
  amount: number;
  whom: string;
  comment: string;
  is_redeemed: boolean;
}

export interface CreatePaymentParams {
  amount: number;
  whom: string;
  comment: string;
}

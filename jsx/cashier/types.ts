export interface Payment {
  id: number;
  amount: number;
  whom: string;
  is_redeemed: boolean;
}

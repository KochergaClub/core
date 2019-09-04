interface NowCustomer {
  first_name: string;
  last_name: string;
}

export interface NowData {
  total: number;
  customers: NowCustomer[];
}

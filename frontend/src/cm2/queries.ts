import gql from 'graphql-tag';

import { Customer } from './types';

export interface OrderWithCustomer {
  id: string;
  start: string;
  end?: string;
  value: number;
  customer: Customer;
}

export const orderWithCustomerFragment = gql`
  fragment OrderWithCustomer on Cm2Order {
    id
    start
    end
    value
    customer {
      id
      first_name
      last_name
      card_id
    }
  }
`;

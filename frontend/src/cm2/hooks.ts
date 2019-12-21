import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

const getOrdersQuery = gql`
  query GetCm2Orders($status: String!) {
    cm2Orders(status: $status) {
      ...OrderWithCustomer
    }
  }

  ${orderWithCustomerFragment}
`;

export const useOrdersQuery = ({ status }: { status: 'open' | 'closed' }) =>
  useQuery<
    {
      cm2Orders: OrderWithCustomer[];
    },
    { status: string }
  >(getOrdersQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      status,
    },
  });

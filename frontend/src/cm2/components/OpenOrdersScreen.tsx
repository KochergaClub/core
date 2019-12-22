import { useCallback } from 'react';

import { useApolloClient } from '@apollo/react-hooks';

import { Collection } from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import { PaddedBlock } from '~/components';

import {
  CustomerFragment,
  useGetCm2OrdersQuery,
  useCm2CreateOrderMutation,
  SearchCm2CustomersQuery,
  SearchCm2CustomersQueryVariables,
} from '../codegen';
import { SEARCH_CUSTOMERS } from '../queries';

import ApolloQueryResults from './ApolloQueryResults';
import OrdersTableView from './OrdersTableView';

const OpenOrdersScreen: React.FC = () => {
  const queryResults = useGetCm2OrdersQuery({
    variables: { status: 'open' },
    fetchPolicy: 'cache-and-network',
  });
  const apolloClient = useApolloClient();

  const [addMutation] = useCm2CreateOrderMutation();

  interface CreateOrderFormParams {
    customer?: string;
  }

  const add = useCallback(
    async (data: CreateOrderFormParams) => {
      await addMutation({ variables: { params: data } });
      await queryResults.refetch();
    },
    [addMutation, queryResults.refetch]
  );

  const addShape: FormShape = [
    {
      type: 'fk',
      name: 'customer',
      title: 'Клиент',
      widget: {
        type: 'async',
        display: (c: CustomerFragment) =>
          `№${c.card_id} ${c.first_name} ${c.last_name}`,
        load: async (inputValue: string) => {
          const { data: customersData } = await apolloClient.query<
            SearchCm2CustomersQuery,
            SearchCm2CustomersQueryVariables
          >({
            query: SEARCH_CUSTOMERS,
            variables: { search: inputValue },
          });
          if (!customersData) {
            return []; // TODO - proper error handling
          }
          return customersData.cm2Customers.edges.map(edge => edge.node);
        },
        getValue: (c: CustomerFragment) => parseInt(c.id),
      },
    },
  ];

  return (
    <PaddedBlock width="max">
      <ApolloQueryResults {...queryResults}>
        {({
          data: {
            cm2Orders: { edges },
          },
        }) => {
          const orders = edges.map(edge => edge.node);
          return (
            <Collection
              items={orders}
              names={{
                plural: 'заказы',
                genitive: 'заказ',
              }}
              add={{
                cb: add,
                shape: addShape,
              }}
              view={OrdersTableView}
            />
          );
        }}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default OpenOrdersScreen;

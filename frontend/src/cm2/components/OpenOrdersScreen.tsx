import { useCallback } from 'react';

import { useApolloClient } from '@apollo/react-hooks';

import { Collection } from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import { PaddedBlock, ApolloQueryResults } from '~/components';

import {
  CustomerFragment,
  useCm2OrdersQuery,
  useCm2CreateOrderMutation,
  Cm2SearchCustomersQuery,
  Cm2SearchCustomersQueryVariables,
} from '../codegen';
import { SEARCH_CUSTOMERS } from '../queries';

import OrdersTableView from './OrdersTableView';

const OpenOrdersScreen: React.FC = () => {
  const queryResults = useCm2OrdersQuery({
    variables: { status: 'open' },
    fetchPolicy: 'cache-and-network',
  });
  const apolloClient = useApolloClient();

  const [addMutation] = useCm2CreateOrderMutation({
    refetchQueries: ['Cm2Orders'],
    awaitRefetchQueries: true,
  });

  interface CreateOrderFormParams {
    customer?: string;
  }

  const add = useCallback(
    async (data: CreateOrderFormParams) => {
      await addMutation({ variables: { params: data } });
    },
    [addMutation]
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
            Cm2SearchCustomersQuery,
            Cm2SearchCustomersQueryVariables
          >({
            query: SEARCH_CUSTOMERS,
            variables: { search: inputValue },
          });
          if (!customersData) {
            return []; // TODO - proper error handling
          }
          return customersData.cm2Customers.nodes;
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
            cm2Orders: { nodes: orders },
          },
        }) => {
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

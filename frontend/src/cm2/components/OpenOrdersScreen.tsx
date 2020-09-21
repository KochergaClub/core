import { useCallback } from 'react';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { Collection } from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import {
    Cm2CreateOrderDocument, Cm2OrdersDocument, Cm2SearchCustomersDocument, CustomerFragment
} from '../queries.generated';
import OrdersTableView from './OrdersTableView';

const OpenOrdersScreen: React.FC = () => {
  const queryResults = useQuery(Cm2OrdersDocument, {
    variables: { status: 'open' },
    fetchPolicy: 'cache-and-network',
  });
  const apolloClient = useApolloClient();

  const [addMutation] = useMutation(Cm2CreateOrderDocument, {
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
          const { data: customersData } = await apolloClient.query({
            query: Cm2SearchCustomersDocument,
            variables: { search: inputValue },
          });
          if (!customersData) {
            return []; // TODO - proper error handling
          }
          return customersData.cm2Customers.edges.map((e) => e.node);
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
          const orders = edges.map((edge) => edge.node);
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

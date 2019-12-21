import { useCallback } from 'react';

import gql from 'graphql-tag';
import { useQuery, useApolloClient, useMutation } from '@apollo/react-hooks';

import { differenceInMinutes } from 'date-fns';

import Link from 'next/link';
import { A } from '@kocherga/frontkit';

import { Collection, CustomTableView } from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import { CreateOrderParams, Customer } from '../types';

import { OrderWithCustomer, orderWithCustomerFragment } from '../queries';

import CustomerLink from './CustomerLink';

const SEARCH_CUSTOMERS = gql`
  query SearchCm2Customers($search: String!) {
    cm2Customers(search: $search) {
      id
      first_name
      last_name
      card_id
    }
  }
`;

const GET_OPEN_ORDERS = gql`
  query {
    cm2Orders(status: "open") {
      ...OrderWithCustomer
    }
  }

  ${orderWithCustomerFragment}
`;

const CREATE_ORDER = gql`
  mutation Cm2CreateOrder($params: Cm2CreateOrderInput!) {
    cm2CreateOrder(params: $params) {
      customer {
        id
      }
    }
  }
`;

export const OpenOrdersTableView: React.FC<{ items: OrderWithCustomer[] }> = ({
  items,
}) => {
  // TODO - better typing
  type ColumnNames = 'card_id' | 'id' | 'time' | 'value' | 'customer';
  const columns: ColumnNames[] = ['card_id', 'id', 'time', 'value', 'customer'];
  const columnLabels: { [k: string]: string } = {
    card_id: 'Карта',
    id: 'Заказ',
    time: 'Время',
    value: 'Сумма',
    customer: 'Клиент',
  };

  return (
    <CustomTableView
      items={items}
      columns={columns}
      renderHeaderCell={column => <div>{columnLabels[column]}</div>}
      renderCell={(item, column) => {
        switch (column) {
          case 'card_id':
            return item.customer ? (
              <strong>{item.customer.card_id}</strong>
            ) : (
              <div>&nbsp;</div>
            );
          case 'id':
            return (
              <Link
                href="/team/cm/orders/[id]"
                as={`/team/cm/orders/${item.id}`}
                passHref
              >
                <A>{item.id}</A>
              </Link>
            );
          case 'time':
            const diff = differenceInMinutes(
              item.end ? new Date(item.end) : new Date(),
              new Date(item.start)
            );
            const hours = Math.floor(diff / 60);
            const minutes = diff % 60;
            return (
              <div>
                {hours ? (
                  <span>
                    <strong>{hours}</strong> ч.{' '}
                  </span>
                ) : (
                  ''
                )}
                <span>
                  <strong>{minutes}</strong> м.
                </span>
              </div>
            );
          case 'value':
            return <div>{item.value} руб.</div>;
          case 'customer':
            return (
              <div>
                {item.customer ? (
                  <CustomerLink customer={item.customer} />
                ) : null}
              </div>
            );
          default:
            return <div>ERROR</div>;
        }
      }}
    />
  );
};

const OpenOrdersScreen: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_OPEN_ORDERS, {
    fetchPolicy: 'cache-and-network',
  });
  const apolloClient = useApolloClient();

  const [addMutation] = useMutation(CREATE_ORDER);

  const add = useCallback(
    async (data: CreateOrderParams) => {
      await addMutation({ variables: { params: data } });
      await refetch();
    },
    [addMutation, refetch]
  );

  const addShape: FormShape = [
    {
      type: 'fk',
      name: 'customer',
      title: 'Клиент',
      widget: {
        type: 'async',
        display: (c: Customer) =>
          `№${c.card_id} ${c.first_name} ${c.last_name}`,
        load: async (inputValue: string) => {
          const { data: customersData } = await apolloClient.query({
            query: SEARCH_CUSTOMERS,
            variables: { search: inputValue },
          });
          if (!customersData) {
            return []; // TODO - proper error handling
          }
          return customersData.cm2Customers;
        },
        getValue: (c: Customer) => c.id,
      },
    },
  ];

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>error: no data</div>;
  }

  const items = data.cm2Orders as OrderWithCustomer[];

  return (
    <Collection
      items={items}
      names={{
        plural: 'заказы',
        genitive: 'заказ',
      }}
      add={{
        cb: add,
        shape: addShape,
      }}
      view={OpenOrdersTableView}
    />
  );
};

export default OpenOrdersScreen;

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Collection } from '~/components/collections';

import { OpenOrdersTableView } from './OpenOrdersScreen';

import { OrderWithCustomer, orderWithCustomerFragment } from '../queries';

const GET_CLOSED_ORDERS = gql`
  query {
    cm2Orders(status: "closed") {
      ...OrderWithCustomer
    }
  }

  ${orderWithCustomerFragment}
`;

const ClosedOrdersScreen: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CLOSED_ORDERS);

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
      view={OpenOrdersTableView}
    />
  );
};

export default ClosedOrdersScreen;

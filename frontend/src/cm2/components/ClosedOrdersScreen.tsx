import { Collection } from '~/components/collections';

import { PaddedBlock } from '~/components';

import { useGetCm2OrdersQuery } from '../codegen';

import OrdersTableView from './OrdersTableView';
import ApolloQueryResults from './ApolloQueryResults';

const ClosedOrdersScreen: React.FC = () => {
  const queryResults = useGetCm2OrdersQuery({
    variables: { status: 'closed' },
    fetchPolicy: 'cache-and-network',
  });

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
              view={OrdersTableView}
            />
          );
        }}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default ClosedOrdersScreen;

import { Collection } from '~/components/collections';

import { PaddedBlock, ApolloQueryResults } from '~/components';

import { useCm2OrdersQuery } from '../codegen';

import OrdersTableView from './OrdersTableView';

const ClosedOrdersScreen: React.FC = () => {
  const queryResults = useCm2OrdersQuery({
    variables: { status: 'closed' },
    fetchPolicy: 'cache-and-network',
  });

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
              view={OrdersTableView}
            />
          );
        }}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default ClosedOrdersScreen;

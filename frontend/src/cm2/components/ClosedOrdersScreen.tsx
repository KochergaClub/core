import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { Collection } from '~/components/collections';

import { Cm2OrdersDocument } from '../queries.generated';
import OrdersTableView from './OrdersTableView';

const ClosedOrdersScreen: React.FC = () => {
  const queryResults = useQuery(Cm2OrdersDocument, {
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
          const orders = edges.map((edge) => edge.node);
          return (
            <Collection
              items={orders}
              names={{
                plural: 'заказы',
                genitive: 'заказ',
              }}
              view={({ items }) => <OrdersTableView items={items} />}
            />
          );
        }}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default ClosedOrdersScreen;

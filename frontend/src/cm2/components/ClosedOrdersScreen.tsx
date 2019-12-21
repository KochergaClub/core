import { Collection } from '~/components/collections';

import { PaddedBlock } from '~/components';

import { useOrdersQuery } from '../hooks';

import { OpenOrdersTableView } from './OpenOrdersScreen';
import ApolloQueryResults from './ApolloQueryResults';

const ClosedOrdersScreen: React.FC = () => {
  const queryResults = useOrdersQuery({ status: 'closed' });

  return (
    <PaddedBlock width="max">
      <ApolloQueryResults {...queryResults}>
        {({ data: { cm2Orders }, loading }) => (
          <Collection
            items={cm2Orders}
            names={{
              plural: 'заказы',
              genitive: 'заказ',
            }}
            view={OpenOrdersTableView}
          />
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default ClosedOrdersScreen;

import { PagedCollection } from '~/components/collections';

import { closedOrdersFeature } from '../features/closedOrders';

import { OpenOrdersTableView } from './OpenOrdersScreen';

const ClosedOrdersScreen: React.FC = () => {
  return (
    <PagedCollection
      feature={closedOrdersFeature}
      names={{
        plural: 'заказы',
        genitive: 'заказ',
      }}
      view={OpenOrdersTableView}
    />
  );
};

export default ClosedOrdersScreen;

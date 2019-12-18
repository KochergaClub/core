import { useCallback } from 'react';

import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import { PagedCollection, ListView } from '~/components/collections';

import { closedOrdersFeature } from '../features/closedOrders';
import { Order } from '../types';

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div>
      <Link
        href="/team/cm/orders/[id]"
        as={`/team/cm/orders/${order.id}`}
        passHref
      >
        <A>{order.id}</A>
      </Link>
    </div>
  );
};

const ClosedOrdersScreen: React.FC = () => {
  const renderItem = useCallback(
    (item: Order) => <OrderItem order={item} />,
    []
  );

  return (
    <PagedCollection
      feature={closedOrdersFeature}
      names={{
        plural: 'заказы',
        genitive: 'заказ',
      }}
      view={props => <ListView {...props} renderItem={renderItem} />}
    />
  );
};

export default ClosedOrdersScreen;

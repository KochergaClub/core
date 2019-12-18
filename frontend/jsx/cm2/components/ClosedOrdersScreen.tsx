import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import { Collection, ListView } from '~/components/collections';

import { selectClosedOrders } from '../features/closedOrders';
import { Order, orderShape } from '../types';

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
  const orders = useSelector(selectClosedOrders);

  const renderItem = useCallback(
    (item: Order) => <OrderItem order={item} />,
    []
  );

  return (
    <Collection
      names={{
        plural: 'заказы',
        genitive: 'заказ',
      }}
      items={orders}
      view={props => <ListView {...props} renderItem={renderItem} />}
    />
  );
};

export default ClosedOrdersScreen;

import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import Collection from '~/components/collections/Collection';

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

  const getId = useCallback((item: Order) => item.id, []);

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
      shape={orderShape}
      items={orders}
      getId={getId}
      renderItem={renderItem}
    />
  );
};

export default ClosedOrdersScreen;

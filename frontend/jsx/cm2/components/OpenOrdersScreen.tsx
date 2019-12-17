import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import Collection from '~/components/collections/Collection';
import { useDispatch } from '~/common/hooks';

import { addOrder } from '../features/orderActions';
import { selectOpenOrders } from '../features/openOrders';
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

const OpenOrdersScreen: React.FC = () => {
  const orders = useSelector(selectOpenOrders);
  const dispatch = useDispatch();

  const add = useCallback(async () => {
    await dispatch(addOrder({}));
  }, [dispatch]);

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
      add={add}
      getId={getId}
      renderItem={renderItem}
    />
  );
};

export default OpenOrdersScreen;

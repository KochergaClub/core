import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { A, Row, HR } from '@kocherga/frontkit';

import { useDispatch } from '~/common/hooks';
import { AsyncButton } from '~/components';
import { Collection, ListView } from '~/components/collections';

import {
  selectClosedOrders,
  selectClosedOrdersPager,
  loadClosedOrders,
} from '../features/closedOrders';
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

const Pager: React.FC = () => {
  const pager = useSelector(selectClosedOrdersPager);
  const dispatch = useDispatch();

  const previous = useCallback(async () => {
    if (!pager) {
      return;
    }
    await dispatch(loadClosedOrders(pager.page - 1));
  }, [dispatch, pager]);

  const next = useCallback(async () => {
    if (!pager) {
      return;
    }
    await dispatch(loadClosedOrders(pager.page + 1));
  }, [dispatch, pager]);

  if (!pager) {
    return null; // not loaded yet
  }

  return (
    <div>
      <HR />
      <Row spaced>
        <AsyncButton act={previous} disabled={!pager.hasPrevious}>
          &larr; Предыдущая страница
        </AsyncButton>
        <div>Страница {pager.page}</div>
        <AsyncButton act={next} disabled={!pager.hasNext}>
          Cледующая страница &rarr;
        </AsyncButton>
      </Row>
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
    <div>
      <Collection
        names={{
          plural: 'заказы',
          genitive: 'заказ',
        }}
        items={orders}
        view={props => <ListView {...props} renderItem={renderItem} />}
      />
      <Pager />
    </div>
  );
};

export default ClosedOrdersScreen;

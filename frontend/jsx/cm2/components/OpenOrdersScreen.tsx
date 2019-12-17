import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import Collection from '~/components/collections/Collection';
import TableView from '~/components/collections/TableView';
import { useDispatch } from '~/common/hooks';

import { addOrder } from '../features/orderActions';
import { selectOpenOrders } from '../features/openOrders';
import { orderShape } from '../types';

const OpenOrdersScreen: React.FC = () => {
  const orders = useSelector(selectOpenOrders);
  const dispatch = useDispatch();

  const add = useCallback(async () => {
    await dispatch(addOrder({}));
  }, [dispatch]);

  return (
    <Collection
      names={{
        plural: 'заказы',
        genitive: 'заказ',
      }}
      shape={orderShape}
      items={orders}
      add={add}
      view={props => (
        <TableView
          {...props}
          extraColumns={['Заказ']}
          renderExtraColumn={item => (
            <Link
              href="/team/cm/orders/[id]"
              as={`/team/cm/orders/${item.id}`}
              passHref
            >
              <A>Заказ</A>
            </Link>
          )}
        />
      )}
    />
  );
};

export default OpenOrdersScreen;

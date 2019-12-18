import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import { Collection, TableView } from '~/components/collections';
import { useDispatch } from '~/common/hooks';
import { selectAPI } from '~/core/selectors';

import { addOrder } from '../features/orderActions';
import { selectOpenOrders } from '../features/openOrders';
import { orderShape, Customer } from '../types';

const OpenOrdersScreen: React.FC = () => {
  const ordersAux = useSelector(selectOpenOrders);
  const dispatch = useDispatch();

  const api = useSelector(selectAPI);

  const add = useCallback(
    async values => {
      await dispatch(addOrder(values));
    },
    [dispatch]
  );

  const addShape = orderShape.concat({
    type: 'fk',
    name: 'customer',
    title: 'Клиент',
    widget: {
      type: 'async',
      display: (c: Customer) => `${c.first_name} ${c.last_name}`,
      load: async () => {
        const customers = (await api.call('cm2/customer', 'GET')).results; // TODO - pager or customer-all route
        return customers;
      },
      getValue: (c: Customer) => c.id,
    },
  });

  return (
    <Collection
      names={{
        plural: 'заказы',
        genitive: 'заказ',
      }}
      items={ordersAux.map(orderAux => orderAux.order)}
      add={{
        cb: add,
        shape: addShape,
      }}
      view={props => (
        <TableView
          {...props}
          shape={orderShape}
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

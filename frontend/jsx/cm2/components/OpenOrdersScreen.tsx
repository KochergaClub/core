import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import Collection from '~/components/collections/Collection';
import TableView from '~/components/collections/TableView';
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
      console.log(values);
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
      shape={addShape}
      items={ordersAux.map(orderAux => orderAux.order)}
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

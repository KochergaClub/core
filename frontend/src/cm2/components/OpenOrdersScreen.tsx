import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { differenceInMinutes } from 'date-fns';

import Link from 'next/link';
import { A } from '@kocherga/frontkit';

import { useDispatch } from '~/common/hooks';
import { selectAPI } from '~/core/selectors';

import { PagedCollection, CustomTableView } from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import { addOrder } from '../features/orderActions';
import { openOrdersFeature } from '../features/openOrders';
import { OrderAux, Customer } from '../types';

import CustomerLink from './CustomerLink';

export const OpenOrdersTableView: React.FC<{ items: OrderAux[] }> = ({
  items,
}) => {
  // TODO - better typing
  type ColumnNames = 'card_id' | 'id' | 'time' | 'value' | 'customer';
  const columns: ColumnNames[] = ['card_id', 'id', 'time', 'value', 'customer'];
  const columnLabels: { [k: string]: string } = {
    card_id: 'Карта',
    id: 'Заказ',
    time: 'Время',
    value: 'Сумма',
    customer: 'Клиент',
  };

  return (
    <CustomTableView
      items={items}
      columns={columns}
      renderHeaderCell={column => <div>{columnLabels[column]}</div>}
      renderCell={(item, column) => {
        switch (column) {
          case 'card_id':
            return item.customer ? (
              <strong>{item.customer.card_id}</strong>
            ) : (
              <div>&nbsp;</div>
            );
          case 'id':
            return (
              <Link
                href="/team/cm/orders/[id]"
                as={`/team/cm/orders/${item.order.id}`}
                passHref
              >
                <A>{item.order.id}</A>
              </Link>
            );
          case 'time':
            const diff = differenceInMinutes(
              item.order.end || new Date(),
              item.order.start
            );
            const hours = Math.floor(diff / 60);
            const minutes = diff % 60;
            return (
              <div>
                {hours ? (
                  <span>
                    <strong>{hours}</strong> ч.{' '}
                  </span>
                ) : (
                  ''
                )}
                <span>
                  <strong>{minutes}</strong> м.
                </span>
              </div>
            );
          case 'value':
            return <div>{item.order.value} руб.</div>;
          case 'customer':
            return (
              <div>
                {item.customer ? (
                  <CustomerLink customer={item.customer} />
                ) : null}
              </div>
            );
          default:
            return <div>ERROR</div>;
        }
      }}
    />
  );
};

const OpenOrdersScreen: React.FC = () => {
  const dispatch = useDispatch();

  const api = useSelector(selectAPI);

  const add = useCallback(
    async values => {
      await dispatch(addOrder(values));
    },
    [dispatch]
  );

  const addShape: FormShape = [
    {
      type: 'fk',
      name: 'customer',
      title: 'Клиент',
      widget: {
        type: 'async',
        display: (c: Customer) =>
          `№${c.card_id} ${c.first_name} ${c.last_name}`,
        load: async (inputValue: string) => {
          const customers = (
            await api.call(`cm2/customer?search=${inputValue}`, 'GET')
          ).results; // TODO - search method or customer-all route
          return customers;
        },
        getValue: (c: Customer) => c.id,
      },
    },
  ];

  return (
    <PagedCollection
      feature={openOrdersFeature}
      names={{
        plural: 'заказы',
        genitive: 'заказ',
      }}
      add={{
        cb: add,
        shape: addShape,
      }}
      view={OpenOrdersTableView}
    />
  );
};

export default OpenOrdersScreen;

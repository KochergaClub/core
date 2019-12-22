import { differenceInMinutes } from 'date-fns';

import Link from 'next/link';
import { A } from '@kocherga/frontkit';

import { CustomTableView } from '~/components/collections';

import { OrderWithCustomerFragment } from '../codegen';

import CustomerLink from './CustomerLink';

const OrdersTableView: React.FC<{
  items: OrderWithCustomerFragment[];
}> = ({ items }) => {
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
                as={`/team/cm/orders/${item.id}`}
                passHref
              >
                <A>{item.id}</A>
              </Link>
            );
          case 'time':
            const diff = differenceInMinutes(
              item.end ? new Date(item.end) : new Date(),
              new Date(item.start)
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
            return <div>{item.value} руб.</div>;
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

export default OrdersTableView;

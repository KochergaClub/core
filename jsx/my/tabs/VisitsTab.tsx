import React from 'react';
import { connect } from 'react-redux';

import { utcToZonedTime } from 'date-fns-tz';

import { Column } from '@kocherga/frontkit';

import { timezone, formatDate } from '~/common/utils';
import { State } from '~/redux/store';

import { Customer, Order } from '../types';
import * as selectors from '../selectors';

import CustomerCard from '../components/CustomerCard';
import HeadedFragment from '../components/HeadedFragment';

import NonCustomerVisitsTab from './NonCustomerVisitsTab';

const inflect = (n: number) => {
  if ((n % 100 < 10 || n % 100 > 20) && [2, 3, 4].includes(n % 10)) {
    return 'а';
  }
  return '';
};

interface Props {
  customer?: Customer;
  orders_count: number;
  orders: Order[];
}

const VisitsTab = ({ customer, orders_count, orders }: Props) => {
  if (!customer) {
    return <NonCustomerVisitsTab />;
  }
  return (
    <article>
      <Column centered>
        <CustomerCard id={customer.card_id} />

        {customer.subscription_until && (
          <p>
            Абонемент до <strong>{customer.subscription_until}</strong>.
          </p>
        )}

        <p>
          Вы были в Кочерге <strong>{orders_count}</strong> раз
          {inflect(orders_count)}.
        </p>

        {orders.length && (
          <HeadedFragment title="Последние посещения">
            <ul>
              {orders.map((order, i) => (
                <li key={i}>
                  {formatDate(
                    utcToZonedTime(order.start_dt, timezone),
                    'yyyy-MM-dd, HH:mm'
                  )}
                </li>
              ))}
            </ul>
          </HeadedFragment>
        )}
      </Column>
    </article>
  );
};

export default connect((state: State) => ({
  customer: selectors.selectCustomer(state),
  orders_count: selectors.selectOrdersCount(state) || 0,
  orders: selectors.selectOrders(state),
}))(VisitsTab);

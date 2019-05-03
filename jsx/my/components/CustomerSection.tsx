import React, { useCallback } from 'react';

import { Button } from '@kocherga/frontkit';

import { utcToZonedTime } from 'date-fns-tz';

import { useAPI } from '../../common/hooks';
import { timezone, formatDate } from '../../common/utils';

import { Customer, Order } from '../types';

const inflect = (n: number) => {
  if ((n % 100 < 10 || n % 100 > 20) && [2, 3, 4].includes(n % 10)) {
    return 'а';
  }
  return '';
};

const oppositePrivacyMode = (mode: string) =>
  mode == 'private' ? 'public' : 'private';

interface Props {
  customer: Customer;
  orders_count: number;
  orders: Order[];
}

const CustomerSection = ({ customer, orders_count, orders }: Props) => {
  const api = useAPI();

  const flipPrivacyMode = useCallback(
    async () => {
      await api.call('cm/me/set-privacy-mode', 'POST', {
        privacy_mode: oppositePrivacyMode(customer.privacy_mode),
      });
      window.location.reload(); // TODO
    },
    [customer.privacy_mode]
  );

  return (
    <div>
      <h2>Посещения</h2>
      <p>
        Номер вашей карты: <strong>{customer.card_id}</strong>
      </p>

      {customer.subscription_until && (
        <p>
          Абонемент до <strong>{customer.subscription_until}</strong>.
        </p>
      )}

      <p>
        Всего вы были в Кочерге <strong>{orders_count}</strong> раз{inflect(
          orders_count
        )}.
      </p>

      {orders.length && (
        <div>
          <p>Последние посещения:</p>
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
        </div>
      )}

      <section>
        <h3>Настройки приватности</h3>
        Ваше присутствие{' '}
        <strong>
          {customer.privacy_mode == 'public'
            ? 'отображается'
            : 'не отображается'}
        </strong>{' '}
        на <a href="https://now.kocherga.club">now.kocherga.club</a> и
        телевизорах в Кочерге.
        <Button onClick={flipPrivacyMode}>
          {customer.privacy_mode == 'public' ? 'Отключить' : 'Включить'}
        </Button>
        <input
          type="hidden"
          value={oppositePrivacyMode(customer.privacy_mode)}
          name="privacy_mode"
        />
      </section>
    </div>
  );
};

export default CustomerSection;

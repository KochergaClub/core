import { utcToZonedTime } from 'date-fns-tz';

import { Column } from '@kocherga/frontkit';

import { timezone, formatDate } from '~/common/utils';

import CustomerCard from '../components/CustomerCard';
import HeadedFragment from '../components/HeadedFragment';

import NonCustomerVisitsTab from './NonCustomerVisitsTab';

import { MyVisitsPageFragment } from '../queries.generated';

const inflect = (n: number) => {
  if ((n % 100 < 10 || n % 100 > 20) && [2, 3, 4].includes(n % 10)) {
    return 'а';
  }
  return '';
};

interface Props {
  my: MyVisitsPageFragment;
}

const VisitsTab = ({ my }: Props) => {
  if (!my.membership) {
    return <NonCustomerVisitsTab />;
  }

  if (!my.membership.orders || my.membership.orders_count === undefined) {
    return <div>Внутренняя ошибка: данные о заказах не загружены</div>;
  }

  return (
    <article>
      <Column centered>
        <CustomerCard id={my.membership.card_id} />

        {my.membership.subscription_until && (
          <p>
            Абонемент до <strong>{my.membership.subscription_until}</strong>.
          </p>
        )}

        <p>
          Вы были в Кочерге <strong>{my.membership.orders_count}</strong> раз
          {inflect(my.membership.orders_count)}.
        </p>

        {my.membership.orders.length && (
          <HeadedFragment title="Последние посещения">
            <ul>
              {my.membership.orders.map((order, i) => (
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

export default VisitsTab;

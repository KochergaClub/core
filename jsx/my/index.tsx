import React from 'react';

import { Screen } from '../common/types';
import Page from '../components/Page';
import CSRFInput from '../components/CSRFInput';

import { Button } from '@kocherga/frontkit';

const oppositePrivacyMode = mode => (mode == 'private' ? 'public' : 'private');

const AdminSection = () => (
  <div>
    <a href="/admin">Перейти в админку</a>
  </div>
);

const inflect = (n: number) => {
  if ((n % 100 < 10 || n % 100 > 20) && [2, 3, 4].includes(n % 10)) {
    return 'а';
  }
  return '';
};

const CustomerSection = ({ customer, orders_count, urls }) => (
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

    {customer.last_visit && (
      <p>
        Последнее посещение: <strong>{customer.last_visit}</strong>
      </p>
    )}

    <p>
      Всего вы были в Кочерге <strong>{orders_count}</strong> раз{inflect(
        orders_count
      )}.
    </p>

    <p>
      Суммарно вы потратили в Кочерге <strong>{customer.total_spent}</strong>{' '}
      руб.
    </p>

    <section>
      <h3>Настройки приватности</h3>
      Ваше присутствие{' '}
      <strong>
        {customer.privacy_mode == 'public' ? 'отображается' : 'не отображается'}
      </strong>{' '}
      на <a href="https://now.kocherga.club">now.kocherga.club</a> и телевизорах
      в Кочерге.
      <form method="post" action={urls.set_privacy_mode}>
        <CSRFInput />
        <input
          type="hidden"
          value={oppositePrivacyMode(customer.privacy_mode)}
          name="privacy_mode"
        />
        <Button type="submit">
          {customer.privacy_mode == 'public' ? 'Отключить' : 'Включить'}
        </Button>
      </form>
    </section>
  </div>
);

const NonCustomerSection = () => (
  <p>
    <i>
      Этот аккаунт не связан ни с какой клубной картой.
      <br />
      Если у вас есть клубная карта, возможно, она не привязана к этому
      email-адресу. Попросите администратора это исправить.
    </i>
  </p>
);

const MyPage = ({ email, customer, orders_count, is_staff, urls }) => (
  <Page title="Личный кабинет">
    <div>
      <h1>Личный кабинет Кочерги</h1>

      <div>
        Аккаунт: <code>{email}</code>. <a href="/logout">Выйти</a>
      </div>

      {is_staff && <AdminSection />}
      {customer ? (
        <CustomerSection
          customer={customer}
          orders_count={orders_count}
          urls={urls}
        />
      ) : (
        <NonCustomerSection />
      )}
    </div>
  </Page>
);

export default {
  component: MyPage,
} as Screen;

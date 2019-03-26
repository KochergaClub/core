import React from 'react';

import Page from '../components/Page';

import { Button } from '@kocherga/frontkit';

const oppositePrivacyMode = mode => (mode == 'private' ? 'public' : 'private');

const AdminSection = () => (
  <div>
    <a href="/admin">Перейти в админку</a>
  </div>
);

const CustomerSection = ({ customer, orders_count, csrfToken, urls }) => (
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
      Всего вы были в Кочерге <strong>{orders_count}</strong> раз.
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
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
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

export default ({ email, customer, orders_count, is_staff, csrfToken, urls }) => (
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
          csrfToken={csrfToken}
          urls={urls}
        />
      ) : (
        <NonCustomerSection />
      )}
    </div>
  </Page>
);

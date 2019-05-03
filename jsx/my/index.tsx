import React, { useCallback } from 'react';

import { Screen, InitialLoader } from '../common/types';
import { useAPI } from '../common/hooks';
import Page from '../components/Page';
import { APIError } from '../common/api';

import { Button } from '@kocherga/frontkit';

const AdminSection = () => (
  <div>
    <a href="/team/">Перейти в интранет</a>
  </div>
);

const inflect = (n: number) => {
  if ((n % 100 < 10 || n % 100 > 20) && [2, 3, 4].includes(n % 10)) {
    return 'а';
  }
  return '';
};

interface Customer {
  card_id: number;
  subscription_until?: string;
  last_visit?: string;
  total_spent: number;
  privacy_mode: string;
}

interface Props {
  email: string;
  is_staff: boolean;
  customer?: Customer;
  orders_count?: number;
  children?: React.ReactNode;
}

const CustomerSection = ({
  customer,
  orders_count,
}: {
  customer: Customer;
  orders_count: number;
}) => {
  const api = useAPI();

  const oppositePrivacyMode = (mode: string) =>
    mode == 'private' ? 'public' : 'private';

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

const MyPage = ({ email, customer, orders_count, is_staff }: Props) => (
  <Page title="Личный кабинет">
    <div>
      <h1>Личный кабинет Кочерги</h1>

      <div>
        Аккаунт: <code>{email}</code>. <a href="/logout">Выйти</a>
      </div>

      {is_staff && <AdminSection />}
      {customer ? (
        <CustomerSection customer={customer} orders_count={orders_count || 0} />
      ) : (
        <NonCustomerSection />
      )}
    </div>
  </Page>
);

const getInitialData: InitialLoader = async ({ api, user }) => {
  if (!user.email) {
    throw new APIError('You need to be logged in to see /my', 403);
  }

  let data: Props = {
    email: user.email,
    is_staff: user.is_staff || false,
  };

  try {
    const { customer, orders_count } = await api.call('cm/me', 'GET');
    data = {
      ...data,
      customer,
      orders_count,
    };
  } catch (e) {
    if (e instanceof APIError && e.status === 404) {
      // that's ok, not all users are registered in CM
    } else {
      throw e;
    }
  }
  return data;
};

const screen: Screen = {
  component: MyPage,
  getInitialData,
};

export default screen;

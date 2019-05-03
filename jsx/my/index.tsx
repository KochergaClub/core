import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import { APIError } from '../common/api';

import CustomerSection from './components/CustomerSection';
import NonCustomerSection from './components/NonCustomerSection';

import Page from '../components/Page';

import { Customer, Order } from './types';

const AdminSection = () => (
  <div>
    <a href="/team/">Перейти в интранет</a>
  </div>
);

interface Props {
  email: string;
  is_staff: boolean;
  customer?: Customer;
  orders_count?: number;
  orders?: Order[];
  children?: React.ReactNode;
}

const MyPage = ({ email, customer, orders_count, orders, is_staff }: Props) => (
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
          orders_count={orders_count || 0}
          orders={orders || []}
        />
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
    const orders = (await api.call('cm/me/orders', 'GET')) as Order[];
    data = {
      ...data,
      customer,
      orders_count,
      orders,
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

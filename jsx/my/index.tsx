import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import { APIError } from '../common/api';

import CustomerSection from './components/CustomerSection';
import NonCustomerSection from './components/NonCustomerSection';
import SetPassword from './components/SetPassword';
import LogoutButton from './components/LogoutButton';

import Page from '../components/Page';
import PageTitle from '../components/PageTitle';

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
    <PageTitle>Личный кабинет Кочерги</PageTitle>
    <div>
      <div>
        Аккаунт: <code>{email}</code>. <LogoutButton />
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
      <SetPassword />
    </div>
  </Page>
);
// test

const getInitialData: InitialLoader<Props> = async ({ api, user }) => {
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

const screen: Screen<Props> = {
  component: MyPage,
  getInitialData,
};

export default screen;

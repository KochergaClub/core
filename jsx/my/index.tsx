import React, { useState } from 'react';

import { Column, RowNav } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import { APIError } from '~/common/api';

import CustomerSection from './components/CustomerSection';
import NonCustomerSection from './components/NonCustomerSection';
import TicketsSection from './components/TicketsSection';
import SettingsSection from './components/SettingsSection';
import LogoutButton from './components/LogoutButton';

import Page from '~/components/Page';
import PageTitle from '~/components/PageTitle';

import { Customer, Order, MyTicket } from './types';

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
  tickets: MyTicket[];
  children?: React.ReactNode;
}

const MyPage = ({
  email,
  customer,
  orders_count,
  orders,
  is_staff,
  tickets,
}: Props) => {
  const [tab, setTab] = useState('visits');

  const getSection = () => {
    switch (tab) {
      case 'visits':
        if (customer) {
          return (
            <CustomerSection
              customer={customer}
              orders_count={orders_count || 0}
              orders={orders || []}
            />
          );
        } else {
          return <NonCustomerSection />;
        }
      case 'tickets':
        return <TicketsSection tickets={tickets} />;
      case 'settings':
        return <SettingsSection />;
      default:
        throw new Error('Unknown tab');
    }
  };

  return (
    <Page title="Личный кабинет">
      <PageTitle>Личный кабинет</PageTitle>
      <Column centered>
        <div>
          Аккаунт: <code>{email}</code>. <LogoutButton />
        </div>
        {is_staff && <AdminSection />}
        <RowNav>
          {[
            ['visits', 'Посещения'],
            ['tickets', 'Регистрации'],
            ['settings', 'Настройки'],
          ].map(([t, tName]) => (
            <RowNav.Item key={t} selected={tab === t} select={() => setTab(t)}>
              {tName}
            </RowNav.Item>
          ))}
        </RowNav>
        <div style={{ maxWidth: 600 }}>{getSection()}</div>
      </Column>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api, user }) => {
  if (!user.email) {
    throw new APIError('You need to be logged in to see /my', 403);
  }

  let data: Props = {
    email: user.email,
    is_staff: user.is_staff || false,
    tickets: [],
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

  data.tickets = await api.call('my/tickets', 'GET');

  return data;
};

const screen: Screen<Props> = {
  component: MyPage,
  getInitialData,
};

export default screen;

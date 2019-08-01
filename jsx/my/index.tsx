import React, { useState, useReducer } from 'react';

import styled from 'styled-components';

import { A, Column, RowNav } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import { APIError } from '~/common/api';

import VisitsTab from './tabs/VisitsTab';
import NonCustomerVisitsTab from './tabs/NonCustomerVisitsTab';
import TicketsTab from './tabs/TicketsTab';
import SettingsTab from './tabs/SettingsTab';
import LogoutButton from './components/LogoutButton';

import Page from '~/components/Page';

import { Customer, Order, MyTicket } from './types';

import { getOrders, getCmData, getTickets } from './api';

import { reducer, MyDispatch } from './store';

const AdminSection = () => (
  <div style={{ marginBottom: 10 }}>
    <A href="/team/">Перейти в интранет</A>
  </div>
);

const SectionWrapper = styled.div`
  max-width: 600px;
  margin-top: 20px;
`;

interface Props {
  email: string;
  is_staff: boolean;
  customer?: Customer;
  orders_count?: number;
  orders?: Order[];
  tickets: MyTicket[];
  children?: React.ReactNode;
}

const MyPage = (props: Props) => {
  const [tab, setTab] = useState('tickets');

  const [store, dispatch] = useReducer(reducer, {
    customer: props.customer,
    tickets: props.tickets,
  });

  const getSection = () => {
    switch (tab) {
      case 'visits':
        if (store.customer) {
          return (
            <VisitsTab
              customer={store.customer}
              orders_count={props.orders_count || 0}
              orders={props.orders || []}
            />
          );
        } else {
          return <NonCustomerVisitsTab />;
        }
      case 'tickets':
        return <TicketsTab tickets={store.tickets} />;
      case 'settings':
        return <SettingsTab customer={store.customer} />;
      default:
        throw new Error('Unknown tab');
    }
  };

  return (
    <Page title="Личный кабинет">
      <MyDispatch.Provider value={dispatch}>
        <Page.Title>Личный кабинет</Page.Title>
        <Page.Main>
          <Column centered>
            <div>
              <code>{props.email}</code> <LogoutButton />
            </div>
            {props.is_staff && <AdminSection />}
            <RowNav>
              {[
                ['tickets', 'События'],
                ['visits', 'Посещения'],
                ['settings', 'Настройки'],
              ].map(([t, tName]) => (
                <RowNav.Item
                  key={t}
                  selected={tab === t}
                  select={() => setTab(t)}
                >
                  {tName}
                </RowNav.Item>
              ))}
            </RowNav>
            <SectionWrapper>{getSection()}</SectionWrapper>
          </Column>
        </Page.Main>
      </MyDispatch.Provider>
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
    const { customer, orders_count } = await getCmData(api);
    const orders = await getOrders(api);
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

  data.tickets = await getTickets(api);

  return data;
};

const screen: Screen<Props> = {
  component: MyPage,
  getInitialData,
};

export default screen;

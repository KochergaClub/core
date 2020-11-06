import { useRouter } from 'next/router';
import React from 'react';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { Page } from '~/components';
import { WithNavSidebar } from '~/frontkit';

import OrderCollectionBlock from '../components/orders/OrderCollectionBlock';
import TicketCollectionBlock from '../components/tickets/TicketCollectionBlock';
import TrainingCollectionBlock from '../components/TrainingCollectionBlock';
import AdminRatioTraining from '../components/trainings/AdminRatioTraining';

const tabs = [
  { title: 'Тренинги', name: 'trainings' },
  { title: 'Продукты', name: 'products' },
  { title: 'Заказы', name: 'orders' },
  { title: 'Билеты', name: 'tickets' },
];

const AdminRatioIndexPage: NextApolloPage = () => {
  const router = useRouter();

  const isSingleTraining = () =>
    router.pathname === '/team/ratio/training/[slug]';

  const renderTab = (name: string) => {
    switch (name) {
      case 'trainings':
        if (isSingleTraining()) {
          return <AdminRatioTraining slug={router.query.slug as string} />;
        } else {
          return <TrainingCollectionBlock eternal={false} />;
        }
      case 'products':
        return <TrainingCollectionBlock eternal={true} />;
      case 'orders':
        return <OrderCollectionBlock />;
      case 'tickets':
        return <TicketCollectionBlock />;
      default:
        return <div>Unknown route {name}</div>;
    }
  };

  const detectTab = () => {
    const route = router.pathname;
    if (route === '/team/ratio') {
      return 'trainings';
    } else if (isSingleTraining()) {
      return 'trainings';
    } else if (route === '/team/ratio/products') {
      return 'products';
    } else if (route === '/team/ratio/orders') {
      return 'orders';
    } else if (route === '/team/ratio/tickets') {
      return 'tickets';
    } else {
      return '';
    }
  };
  const selected = detectTab();

  const selectTab = (name: string) => {
    const name2path: Record<string, string> = {
      trainings: '/team/ratio',
      orders: '/team/ratio/orders',
      products: '/team/ratio/products',
      tickets: '/team/ratio/tickets',
    };
    const path = name2path[name];
    if (path) {
      router.push(path);
    }
  };

  const getPageTitle = () => {
    if (selected === 'orders') {
      return 'Заказы на рацио-тренинги';
    } else if (selected === 'products') {
      return 'Рацио-продукты';
    } else if (selected === 'trainings') {
      return isSingleTraining() ? 'Загружается...' : 'Рацио-тренинги';
    } else if (selected === 'tickets') {
      return 'Билеты на рацио-тренинги';
    } else {
      return 'Not found';
    }
  };

  return (
    <Page title={getPageTitle()} chrome="fullscreen" menu="team">
      <WithNavSidebar
        tabs={tabs}
        header={{
          title: 'Админка тренингов',
          tabName: 'trainings',
          href: '/team/ratio',
        }}
        selected={selected}
        selectTab={selectTab}
        renderTab={renderTab}
      />
    </Page>
  );
};

export default withApollo(withStaff(AdminRatioIndexPage));

import { useRouter } from 'next/router';
import React from 'react';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { Page } from '~/components';
import { WithNavSidebar } from '~/frontkit';

import OrderCollectionBlock from '../components/orders/OrderCollectionBlock';
import TicketCollectionBlock from '../components/tickets/TicketCollectionBlock';
import TicketView from '../components/tickets/TicketView';
import AdminRatioTraining, { Tab } from '../components/trainings/AdminRatioTraining';
import TrainingCollectionBlock from '../components/trainings/TrainingCollectionBlock';
import { adminTrainingRoute } from '../routes';

const tabs = [
  { title: 'Тренинги', name: 'trainings' },
  { title: 'Продукты', name: 'products' },
  { title: 'Заказы', name: 'orders' },
  { title: 'Билеты', name: 'tickets' },
];

const AdminRatioPage: NextApolloPage = () => {
  const router = useRouter();

  const singleTrainingPrefix = adminTrainingRoute('[slug]');

  const isSingleTraining = () =>
    router.pathname === singleTrainingPrefix ||
    router.pathname === singleTrainingPrefix + '/promocodes' ||
    router.pathname === singleTrainingPrefix + '/ticket-types' ||
    router.pathname === singleTrainingPrefix + '/tickets';

  const singleTrainingTab = (): Tab => {
    if (router.pathname === singleTrainingPrefix) {
      return 'info';
    }
    return router.pathname.split('/').pop() as Tab;
  };

  const isSingleTicket = () => router.pathname === '/team/ratio/ticket/[id]';

  const renderTab = (name: string) => {
    switch (name) {
      case 'trainings':
        if (isSingleTraining()) {
          return (
            <AdminRatioTraining
              slug={router.query.slug as string}
              tab={singleTrainingTab()}
            />
          );
        } else {
          return <TrainingCollectionBlock eternal={false} />;
        }
      case 'products':
        return <TrainingCollectionBlock eternal={true} />;
      case 'orders':
        return <OrderCollectionBlock />;
      case 'tickets':
        if (isSingleTicket()) {
          return <TicketView id={router.query.id as string} />;
        } else {
          return <TicketCollectionBlock />;
        }
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
    } else if (isSingleTicket()) {
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
      return isSingleTicket() ? 'Загружается...' : 'Билеты на рацио-тренинги';
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

export default withApollo(withStaff(AdminRatioPage));

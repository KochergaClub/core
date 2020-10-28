import { useRouter } from 'next/router';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { Page } from '~/components';
import { WithNavSidebar } from '~/frontkit';

import OrderCollectionBlock from '../components/orders/OrderCollectionBlock';
import TrainingCollectionBlock from '../components/TrainingCollectionBlock';
import AdminRatioTraining from '../components/trainings/AdminRatioTraining';

const tabs = [
  { title: 'Тренинги', name: 'trainings' },
  { title: 'Заказы', name: 'orders' },
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
          return <TrainingCollectionBlock />;
        }
      case 'orders':
        return <OrderCollectionBlock />;
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
    } else if (route === '/team/ratio/orders') {
      return 'orders';
    } else {
      return '';
    }
  };
  const selected = detectTab();

  const selectTab = (name: string) => {
    const name2path: Record<string, string> = {
      trainings: '/team/ratio',
      orders: '/team/ratio/orders',
    };
    const path = name2path[name];
    if (path) {
      router.push(path);
    }
  };

  const getPageTitle = () => {
    if (selected === 'orders') {
      return 'Заказы на рацио-тренинги';
    } else if (selected === 'trainings') {
      return isSingleTraining() ? 'Загружается...' : 'Рацио-тренинги';
    } else {
      return 'Not found';
    }
  };

  return (
    <Page title={getPageTitle()} chrome="fullscreen">
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

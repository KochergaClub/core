import { useRouter } from 'next/router';
import React from 'react';

import { NextApolloPage, withApollo } from '~/apollo';
import { requireAuth } from '~/auth/utils';
import { Page } from '~/components';
import { WithNavSidebar } from '~/frontkit';

import { SettingsScreen } from '../screens/SettingsScreen';
import { TicketsScreen } from '../screens/TicketsScreen';

const tabs = [
  { title: 'События', name: 'tickets' },
  { title: 'Настройки', name: 'settings' },
];

const MyPage: NextApolloPage = () => {
  const router = useRouter();

  const renderTab = (name: string) => {
    switch (name) {
      case 'tickets':
        return <TicketsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <div>Страница не найдена</div>;
    }
  };

  const detectTab = () => {
    const route = router.pathname;
    if (route === '/my') {
      return 'tickets';
    } else if (route === '/my/settings') {
      return 'settings';
    } else {
      return '';
    }
  };
  const selected = detectTab();

  const selectTab = (name: string) => {
    const name2path: Record<string, string> = {
      tickets: '/my',
      settings: '/my/settings',
    };
    const path = name2path[name];
    if (path) {
      router.push(path);
    }
  };

  const getPageTitle = () => {
    if (selected === 'tickets') {
      return 'Личный кабинет';
    } else if (selected === 'settings') {
      return 'Настройки';
    } else {
      return 'Страница не найдена';
    }
  };

  return (
    <Page title={getPageTitle()} chrome="fullscreen">
      <WithNavSidebar
        tabs={tabs}
        header={{
          title: 'Личный кабинет',
          tabName: 'tickets',
          href: '/my',
        }}
        selected={selected}
        selectTab={selectTab}
        renderTab={renderTab}
      />
    </Page>
  );
};

MyPage.getInitialProps = async ({ apolloClient }) => {
  await requireAuth(apolloClient, { is_authenticated: true });

  return {};
};

export default withApollo(MyPage);

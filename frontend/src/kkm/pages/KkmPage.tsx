import { useRouter } from 'next/router';
import React from 'react';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { PaddedBlock, Page } from '~/components';
import { WithNavSidebar } from '~/frontkit';

import KkmCheckForm from '../components/KkmCheckForm';
import KkmDashboard from '../components/KkmDashboard';
import OfdDocumentCollection from '../components/ofd/OfdDocumentCollection';
import OfdFiscalDriveCollection from '../components/ofd/OfdFiscalDriveCollection';

const tabs = [
  { title: 'Дашборд', name: 'dashboard' },
  { title: 'Пробить чек', name: 'check' },
  { title: 'Данные ОФД', name: 'ofd' },
];

const KkmPage: NextApolloPage = () => {
  const router = useRouter();

  const renderTab = (name: string) => {
    switch (name) {
      case 'dashboard':
        return <KkmDashboard />;
      case 'check':
        return (
          <PaddedBlock>
            <KkmCheckForm />
          </PaddedBlock>
        );
      case 'ofd':
        return (
          <div>
            <OfdDocumentCollection />
            <OfdFiscalDriveCollection />
          </div>
        );
      default:
        return <div>Unknown route {name}</div>;
    }
  };
  const detectTab = () => {
    const route = router.pathname;
    if (route === '/team/kkm') {
      return 'dashboard';
    } else if (route === '/team/kkm/check') {
      return 'check';
    } else if (route === '/team/kkm/ofd') {
      return 'ofd';
    } else {
      return '';
    }
  };
  const selected = detectTab();

  const selectTab = (name: string) => {
    const name2path: Record<string, string> = {
      dashboard: '/team/kkm',
      check: '/team/kkm/check',
      ofd: '/team/kkm/ofd',
    };
    const path = name2path[name];
    if (path) {
      router.push(path);
    }
  };

  return (
    <Page title="Электронные чеки" chrome="fullscreen" menu="team">
      <WithNavSidebar
        tabs={tabs}
        header={{
          title: 'Касса и чеки',
          tabName: 'dashboard',
          href: '/team/kkm',
        }}
        selected={selected}
        selectTab={selectTab}
        renderTab={renderTab}
      />
    </Page>
  );
};

export default withApollo(withStaff(KkmPage));

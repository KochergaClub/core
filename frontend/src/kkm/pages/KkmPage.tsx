import { useRouter } from 'next/router';
import React from 'react';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { PaddedBlock, Page } from '~/components';
import { WithNavSidebar } from '~/frontkit';

import MainForm from '../components/MainForm';
import OfdDocumentCollection from '../components/ofd/OfdDocumentCollection';
import OfdFiscalDriveCollection from '../components/ofd/OfdFiscalDriveCollection';

const tabs = [
  { title: 'Пробить чек', name: 'custom-check' },
  { title: 'Фискальные накопители', name: 'fiscal-drives' },
  { title: 'Чеки', name: 'documents' },
];

const KkmPage: NextApolloPage = () => {
  const router = useRouter();

  const renderTab = (name: string) => {
    switch (name) {
      case 'custom-check':
        return (
          <PaddedBlock>
            <MainForm />
          </PaddedBlock>
        );
      case 'fiscal-drives':
        return <OfdFiscalDriveCollection />;
      case 'documents':
        return <OfdDocumentCollection />;
      default:
        return <div>Unknown route {name}</div>;
    }
  };
  const detectTab = () => {
    const route = router.pathname;
    if (route === '/team/kkm') {
      return 'custom-check';
    } else if (route === '/team/kkm/fiscal-drives') {
      return 'fiscal-drives';
    } else if (route === '/team/kkm/documents') {
      return 'documents';
    } else {
      return '';
    }
  };
  const selected = detectTab();

  const selectTab = (name: string) => {
    const name2path: Record<string, string> = {
      'custom-check': '/team/kkm',
      'fiscal-drives': '/team/kkm/fiscal-drives',
      documents: '/team/kkm/documents',
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
          tabName: 'custom-check',
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

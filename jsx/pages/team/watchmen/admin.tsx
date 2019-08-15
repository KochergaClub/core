import React from 'react';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadWatchmen, loadGrades } from '~/watchmen/actions';

import WatchmenList from '~/watchmen/components/WatchmenList';
import GradesList from '~/watchmen/components/GradesList';

interface Props {}

const WatchmenAdminPage: NextPage<Props> = () => {
  return (
    <Page title="Управление админами" team>
      <Page.Title>Управление админами</Page.Title>
      <Page.Main>
        <WatchmenList />
        <GradesList />
      </Page.Main>
    </Page>
  );
};

WatchmenAdminPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadGrades());
  await dispatch(loadWatchmen());
  return {};
};

export default WatchmenAdminPage;

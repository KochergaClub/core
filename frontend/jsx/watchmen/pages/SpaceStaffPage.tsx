import React from 'react';

import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadWatchmen, loadGrades } from '~/watchmen/actions';

import WatchmenList from '~/watchmen/components/WatchmenList';
import GradesList from '~/watchmen/components/GradesList';

interface Props {}

const SpaceStaffPage: NextPage<Props> = () => {
  return (
    <Page title="Админы Кочерги" team>
      <Page.Title>Админы Кочерги</Page.Title>
      <Page.Main>
        <WatchmenList />
        <GradesList />
        <h2>Расписание смен</h2>
        <Link href="/team/space/staff/shifts" passHref>
          <A>Смотреть</A>
        </Link>
      </Page.Main>
    </Page>
  );
};

SpaceStaffPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadGrades());
  await dispatch(loadWatchmen());
  return {};
};

export default SpaceStaffPage;

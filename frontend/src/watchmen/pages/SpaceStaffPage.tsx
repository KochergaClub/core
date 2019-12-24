import { withApollo } from '~/apollo/client';
import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { Page } from '~/components';

import WatchmenList from '../components/WatchmenList';
import GradesList from '../components/GradesList';

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

export default withApollo(SpaceStaffPage);

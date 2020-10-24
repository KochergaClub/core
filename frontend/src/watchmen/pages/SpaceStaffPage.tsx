import Link from 'next/link';

import { A } from '~/frontkit';

import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page } from '~/components';

import WatchmenList from '../components/WatchmenList';
import GradesList from '../components/GradesList';

const SpaceStaffPage: NextApolloPage = () => {
  return (
    <Page title="Админы Кочерги" menu="team">
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

export default withApollo(withStaff(SpaceStaffPage));

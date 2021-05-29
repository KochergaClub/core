import Link from 'next/link';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { Page } from '~/components';
import { A } from '~/frontkit';

import GradesList from '../components/GradesList';
import { WatchmenList } from '../components/WatchmenList';
import { watchmenShiftsRoute } from '../routes';

const SpaceStaffPage: NextApolloPage = () => {
  return (
    <Page title="Админы Кочерги" menu="team">
      <Page.Title>Админы Кочерги</Page.Title>
      <Page.Main>
        <WatchmenList />
        <GradesList />
        <h2>Расписание смен</h2>
        <Link href={watchmenShiftsRoute()} passHref>
          <A>Смотреть</A>
        </Link>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(SpaceStaffPage));

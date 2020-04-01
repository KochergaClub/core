import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page } from '~/components';

import SinglePermissionsList from '~/audit/components/SinglePermissionsList';
import GroupsList from '~/audit/components/GroupsList';

const AdminPage: NextApolloPage = () => {
  return (
    <Page title="Внутренняя админка" menu="team">
      <Page.Title>Админка доступов</Page.Title>
      <Page.Main>
        <SinglePermissionsList />
        <h2>Группы</h2>
        <GroupsList />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(AdminPage));

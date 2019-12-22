import { NextPage } from '~/common/types';
import { withApollo } from '~/apollo/client';

import { Page } from '~/components';

import SinglePermissionsList from '~/audit/components/SinglePermissionsList';
import GroupsList from '~/audit/components/GroupsList';

const AdminPage: NextPage = () => {
  return (
    <Page title="Внутренняя админка" team>
      <Page.Title>Админка доступов</Page.Title>
      <Page.Main>
        <SinglePermissionsList />
        <h2>Группы</h2>
        <GroupsList />
      </Page.Main>
    </Page>
  );
};

export default withApollo(AdminPage);

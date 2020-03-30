import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import { NextPage } from '~/common/types';

import { Page, PaddedBlock } from '~/components';

import MainForm from '../components/MainForm';

const KkmPage: NextPage = () => {
  return (
    <Page title="Электронные чеки" menu="team">
      <Page.Title>Электронные чеки</Page.Title>
      <Page.Main>
        <PaddedBlock>
          <MainForm />
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(KkmPage));

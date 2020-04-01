import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page, PaddedBlock } from '~/components';

import MainForm from '../components/MainForm';

const KkmPage: NextApolloPage = () => {
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

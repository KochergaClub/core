import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page } from '~/components';

import PbxCallCollection from '../components/PbxCallCollection';

const ZadarmaIndexPage: NextApolloPage = () => {
  return (
    <Page title="Архив звонков" menu="team">
      <Page.Title>Архив звонков</Page.Title>
      <Page.Main>
        <PbxCallCollection />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(ZadarmaIndexPage));

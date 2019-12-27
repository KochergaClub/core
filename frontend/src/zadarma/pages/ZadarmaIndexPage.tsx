import { NextApolloPage } from '~/apollo/types';
import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import { Page } from '~/components';

import PbxCallCollection from '../components/PbxCallCollection';

const ZadarmaIndexPage: NextApolloPage = () => {
  return (
    <Page title="Архив звонков" team>
      <Page.Title>Архив звонков</Page.Title>
      <Page.Main>
        <PbxCallCollection />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(ZadarmaIndexPage));

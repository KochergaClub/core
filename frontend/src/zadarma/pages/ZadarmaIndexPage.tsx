import { withApollo } from '~/apollo/client';

import { Page } from '~/components';

import { NextPage } from '~/common/types';

import PbxCallCollection from '../components/PbxCallCollection';

const ZadarmaIndexPage: NextPage = () => {
  return (
    <Page title="Архив звонков" team>
      <Page.Title>Архив звонков</Page.Title>
      <Page.Main>
        <PbxCallCollection />
      </Page.Main>
    </Page>
  );
};

export default withApollo(ZadarmaIndexPage);

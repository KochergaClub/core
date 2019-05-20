import React from 'react';

import { NextPage } from '~/common/types';

import Page from '~/components/Page';
import WorkInProgress from '~/components/WorkInProgress';

const FrontPage: NextPage = () => {
  return (
    <Page title="Кочерга">
      <Page.Title>Кочерга</Page.Title>
      <Page.Main wide>
        <WorkInProgress />
        <div style={{ textAlign: 'center' }}>
          THIS PAGE WILL BE DELETED SOON
        </div>
      </Page.Main>
    </Page>
  );
};

export default FrontPage;

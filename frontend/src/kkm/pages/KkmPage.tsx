import React from 'react';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { PaddedBlock, Page } from '~/components';

import MainForm from '../components/MainForm';
import OfdFiscalDriveCollection from '../components/ofd/OfdFiscalDriveCollection';

const KkmPage: NextApolloPage = () => {
  return (
    <Page title="Электронные чеки" menu="team">
      <Page.Title>Электронные чеки</Page.Title>
      <Page.Main>
        <PaddedBlock>
          <MainForm />
        </PaddedBlock>
        <OfdFiscalDriveCollection />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(KkmPage));

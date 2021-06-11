import React from 'react';

import { NextApolloPage, withApollo } from '~/apollo';
import { Page } from '~/components';

import { CensusReport } from '../components/CensusReport';

const CensusPage: NextApolloPage = () => {
  return (
    <Page title="Перепись русскоговорящих рационалистов-2021">
      <CensusReport />
    </Page>
  );
};

export default withApollo(CensusPage);

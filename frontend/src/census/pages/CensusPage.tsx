import React from 'react';

import { NextApolloPage, withApollo } from '~/apollo';
import { Page } from '~/components';

import { CensusReport } from '../components/CensusReport';

const CensusPage: NextApolloPage = () => {
  return (
    <Page title="Перепись сообщества">
      <CensusReport />
    </Page>
  );
};

export default withApollo(CensusPage);

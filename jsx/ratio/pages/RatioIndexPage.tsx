import React from 'react';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadTrainings } from '~/ratio/actions';

import TrainingCollection from '~/ratio/components/TrainingCollection';

const RatioIndexPage: NextPage = () => {
  return (
    <Page title="Ratio" team>
      <Page.Title>Воркшопы и тренинги</Page.Title>
      <Page.Main>
        <TrainingCollection />
      </Page.Main>
    </Page>
  );
};

RatioIndexPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadTrainings());
  return {};
};

export default RatioIndexPage;

import React from 'react';

import { Column } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadTrainings } from '~/ratio/actions';
import TrainingList from '~/ratio/components/TrainingList';
import AddTrainingButton from '~/ratio/components/AddTrainingButton';

const RatioIndexPage: NextPage = () => {
  return (
    <Page title="Ratio" team>
      <Page.Title>Воркшопы и тренинги</Page.Title>
      <Page.Main>
        <Column stretch>
          <div>
            <AddTrainingButton />
          </div>
          <TrainingList />
        </Column>
      </Page.Main>
    </Page>
  );
};

RatioIndexPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadTrainings());
  return {};
};

export default RatioIndexPage;

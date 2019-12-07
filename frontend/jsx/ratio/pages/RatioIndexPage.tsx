import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadTrainings } from '~/ratio/features/trainings';

import TrainingCollection from '~/ratio/components/TrainingCollection';

const RatioIndexPage: NextPage = () => {
  return (
    <Page title="Рацио-тренинги" team>
      <Page.Title>Воркшопы, курсы, тренинги</Page.Title>
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

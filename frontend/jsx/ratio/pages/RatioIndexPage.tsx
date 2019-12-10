import { NextPage } from '~/common/types';
import { Page } from '~/components';

import { loadTrainings } from '~/ratio/features/trainings';

import TrainingCollectionBlock from '~/ratio/components/TrainingCollectionBlock';

const RatioIndexPage: NextPage = () => {
  return (
    <Page title="Рацио-тренинги" team>
      <Page.Title>Воркшопы, курсы, тренинги</Page.Title>
      <Page.Main>
        <TrainingCollectionBlock />
      </Page.Main>
    </Page>
  );
};

RatioIndexPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadTrainings());
  return {};
};

export default RatioIndexPage;

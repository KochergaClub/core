import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';
import { NextPage } from '~/common/types';
import { Page } from '~/components';

import TrainingCollectionBlock from '~/ratio/components/TrainingCollectionBlock';

const RatioIndexPage: NextPage = () => {
  return (
    <Page title="Рацио-тренинги" menu="team">
      <Page.Title>Воркшопы, курсы, тренинги</Page.Title>
      <Page.Main>
        <TrainingCollectionBlock />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(RatioIndexPage));

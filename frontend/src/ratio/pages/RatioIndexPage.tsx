import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page } from '~/components';

import TrainingCollectionBlock from '~/ratio/components/TrainingCollectionBlock';

const RatioIndexPage: NextApolloPage = () => {
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

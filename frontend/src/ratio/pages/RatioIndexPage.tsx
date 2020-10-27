import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { Page } from '~/components';

import OrderCollectionBlock from '../components/orders/OrderCollectionBlock';
import TrainingCollectionBlock from '../components/TrainingCollectionBlock';

const RatioIndexPage: NextApolloPage = () => {
  return (
    <Page title="Рацио-тренинги" menu="team">
      <Page.Title>Воркшопы, курсы, тренинги</Page.Title>
      <Page.Main>
        <TrainingCollectionBlock />
        <OrderCollectionBlock />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(RatioIndexPage));

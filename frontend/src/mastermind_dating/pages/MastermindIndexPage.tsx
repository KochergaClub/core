import { withApollo, withStaff, NextApolloPage } from '~/apollo';
import { PaddedBlock, Page } from '~/components';

import CohortCollection from '../components/CohortCollection';

const MastermindIndexPage: NextApolloPage = () => {
  return (
    <Page title="Админка мастермайнд-дейтинга" menu="team">
      <Page.Title>Мастермайнд-дейтинг</Page.Title>
      <Page.Main>
        <PaddedBlock>
          <CohortCollection />
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(MastermindIndexPage));

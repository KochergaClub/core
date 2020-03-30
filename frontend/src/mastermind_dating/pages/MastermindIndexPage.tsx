import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';
import { PaddedBlock, Page } from '~/components';

import CohortCollection from '../components/CohortCollection';

const MastermindIndexPage: NextPage = () => {
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

export default withApollo(MastermindIndexPage);

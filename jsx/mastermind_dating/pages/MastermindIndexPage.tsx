import React, { useReducer } from 'react';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { Cohort } from '~/mastermind_dating/types';
import { getCohorts } from '~/mastermind_dating/api';

import CohortCollection from '~/mastermind_dating/pages/list/components/CohortCollection';

import {
  reducer,
  MastermindContext,
} from '~/mastermind_dating/pages/list/reducer';

interface Props {
  cohorts: Cohort[];
}

const MastermindIndexPage: NextPage<Props> = ({ cohorts }) => {
  const [store, dispatch] = useReducer(reducer, {
    cohorts,
  });

  return (
    <Page title="Админка мастермайнд-дейтинга" team>
      <Page.Title>Мастермайнд-дейтинг</Page.Title>
      <MastermindContext.Provider value={dispatch}>
        <Page.Main>
          <CohortCollection cohorts={store.cohorts} />
        </Page.Main>
      </MastermindContext.Provider>
    </Page>
  );
};

MastermindIndexPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());
  const cohorts = await getCohorts(api);
  return { cohorts };
};

export default MastermindIndexPage;

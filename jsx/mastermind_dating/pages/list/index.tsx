import React, { useReducer } from 'react';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { Cohort } from '../../types';
import { getCohorts } from '../../api';

import CohortList from './components/CohortList';
import CreateCohortButton from './components/CreateCohortButton';

import { reducer, MastermindContext } from './reducer';

interface Props {
  cohorts: Cohort[];
  children?: React.ReactNode;
}

const MastermindIndexPage = ({ cohorts }: Props) => {
  const [store, dispatch] = useReducer(reducer, {
    cohorts,
  });

  return (
    <Page title="Админка мастермайнд-дейтинга" team>
      <Page.Title>Мастермайнд-дейтинг</Page.Title>
      <MastermindContext.Provider value={dispatch}>
        <Page.Main>
          <CohortList cohorts={store.cohorts} />
          <CreateCohortButton />
        </Page.Main>
      </MastermindContext.Provider>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ getState }) => {
  const api = selectAPI(getState());
  const cohorts = await getCohorts(api);
  return { cohorts };
};

const screen: Screen<Props> = {
  component: MastermindIndexPage,
  getInitialData,
};

export default screen;

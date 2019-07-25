import React, { useReducer } from 'react';

import { A } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

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
          <p>
            <small>
              <A href="/admin/mastermind_dating/cohort/">
                Редактировать когорты в админке
              </A>
            </small>
          </p>
          <CohortList cohorts={store.cohorts} />
          <CreateCohortButton />
        </Page.Main>
      </MastermindContext.Provider>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }) => {
  const cohorts = await getCohorts(api);
  return {
    cohorts,
  };
};

const screen: Screen<Props> = {
  component: MastermindIndexPage,
  getInitialData,
};

export default screen;

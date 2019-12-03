import React, { useCallback, useContext } from 'react';

import { useAPI } from '~/common/hooks';

import Collection from '~/components/collections/Collection';
import CardListView from '~/components/collections/CardListView';
import { FormShape } from '~/components/forms/types';

import { Cohort } from '~/mastermind_dating/types';
import { getCohorts } from '~/mastermind_dating/api';

import { MastermindContext } from '../reducer';

import CohortItem from './CohortItem';

interface Props {
  cohorts: Cohort[];
}

const cohortShape: FormShape = [];

const CohortCollection: React.FC<Props> = ({ cohorts }) => {
  const dispatch = useContext(MastermindContext);
  const api = useAPI();

  const renderItem = useCallback(
    (cohort: Cohort) => <CohortItem cohort={cohort} />,
    []
  );

  const add = useCallback(async () => {
    await api.call('/mastermind_dating/cohort', 'POST', {});
    const cohorts = await getCohorts(api);
    dispatch({
      type: 'REPLACE_COHORTS_ACTION',
      payload: {
        cohorts,
      },
    });
  }, []);

  return (
    <Collection
      names={{
        plural: 'когорты',
        genitive: 'когорту',
      }}
      shape={cohortShape}
      items={cohorts}
      renderItem={renderItem}
      add={add}
      view={CardListView}
    />
  );
};

export default CohortCollection;

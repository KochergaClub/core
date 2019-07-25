import React from 'react';

import { A } from '@kocherga/frontkit';

import { Cohort } from '../../../types';

const CohortList = ({ cohorts }: { cohorts: Cohort[] }) => {
  return (
    <ul>
      {cohorts.map(cohort => (
        <li key={cohort.id}>
          <A href={`/team/mastermind_dating/cohort/${cohort.id}`}>
            {cohort.id}
          </A>
        </li>
      ))}
    </ul>
  );
};

export default CohortList;

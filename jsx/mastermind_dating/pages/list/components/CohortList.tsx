import React from 'react';

import { A } from '@kocherga/frontkit';

import { Cohort } from '../../../types';

import { format, parseISO } from 'date-fns';

const CohortItem = ({ cohort }: { cohort: Cohort }) => {
  let title = String(cohort.id);
  if (cohort.event_title && cohort.event_start) {
    const start = format(parseISO(cohort.event_start), 'yyyy-MM-dd');
    title += ' ' + ` (${start})`;
  }
  return (
    <li>
      <A href={`/team/mastermind_dating/cohort/${cohort.id}`}>{title}</A>
    </li>
  );
};

const CohortList = ({ cohorts }: { cohorts: Cohort[] }) => {
  return (
    <ul>
      {cohorts.map(cohort => (
        <CohortItem key={cohort.id} cohort={cohort} />
      ))}
    </ul>
  );
};

export default CohortList;

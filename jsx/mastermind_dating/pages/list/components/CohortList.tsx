import React from 'react';
import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';

import { Cohort } from '../../../types';

import { format, parseISO } from 'date-fns';

const CohortItem = ({ cohort }: { cohort: Cohort }) => {
  let title = String(cohort.id);
  if (cohort.event_title && cohort.event_start) {
    const start = format(parseISO(cohort.event_start), 'yyyy-MM-dd');
    title += ' ' + ` (${start})`;
  }
  return (
    <Card>
      <Link
        href="/team/mastermind_dating/cohort/[id]"
        as={`/team/mastermind_dating/cohort/${cohort.id}`}
        passHref
      >
        <A>{title}</A>
      </Link>
    </Card>
  );
};

const CohortList = ({ cohorts }: { cohorts: Cohort[] }) => {
  return (
    <CardList>
      {cohorts.map(cohort => (
        <CohortItem key={cohort.id} cohort={cohort} />
      ))}
    </CardList>
  );
};

export default CohortList;

import React from 'react';

import { A, Column } from '@kocherga/frontkit';

import DeleteButton from '~/components/crud/DeleteButton';

import { Cohort } from '../../../types';

import CohortEventLink from './CohortEventLink';

interface Props {
  cohort: Cohort;
}

const Controls: React.FC<Props> = ({ cohort }) => (
  <Column>
    <A href="/team/mastermind_dating">&larr; к списку когорт</A>
    <DeleteButton
      endpoint="/mastermind_dating/cohort"
      id={cohort.id}
      redirectOnDelete="/team/mastermind_dating"
    />
    <div style={{ alignSelf: 'stretch' }}>
      <CohortEventLink cohort={cohort} />
    </div>
  </Column>
);

export default Controls;

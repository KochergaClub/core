import React from 'react';
import Link from 'next/link';

import { A, Column, Row } from '@kocherga/frontkit';

import DeleteButton from '~/components/crud/DeleteButton';

import { Cohort } from '../../../types';

import CohortEventLink from './CohortEventLink';

interface Props {
  cohort: Cohort;
}

const Controls: React.FC<Props> = ({ cohort }) => (
  <Column>
    <Link href="/team/mastermind_dating" passHref>
      <A>&larr; к списку когорт</A>
    </Link>
    <Row>
      <DeleteButton
        endpoint="/mastermind_dating/cohort"
        id={cohort.id}
        redirectOnDelete="/team/mastermind_dating"
      />
    </Row>
    <div style={{ alignSelf: 'stretch' }}>
      <CohortEventLink cohort={cohort} />
    </div>
  </Column>
);

export default Controls;

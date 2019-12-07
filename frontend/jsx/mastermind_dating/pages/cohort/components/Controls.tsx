import { useCallback } from 'react';
import Link from 'next/link';

import { A, Column, Row } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import DeleteButton from '~/components/crud/DeleteButton';

import { Cohort } from '../../../types';

import CohortEventLink from './CohortEventLink';

interface Props {
  cohort: Cohort;
}

const Controls: React.FC<Props> = ({ cohort }) => {
  const cbRunSolver = useCallback(async () => {
    window.alert('TODO');
  }, []);
  return (
    <Column>
      <Link href="/team/mastermind_dating" passHref>
        <A>&larr; к списку когорт</A>
      </Link>
      <div style={{ alignSelf: 'stretch' }}>
        <CohortEventLink cohort={cohort} />
      </div>
      <Row>
        <DeleteButton
          endpoint="/mastermind_dating/cohort"
          id={cohort.id}
          redirectOnDelete="/team/mastermind_dating"
        />
        <AsyncButton act={cbRunSolver}>Запустить алгоритм</AsyncButton>
      </Row>
    </Column>
  );
};

export default Controls;

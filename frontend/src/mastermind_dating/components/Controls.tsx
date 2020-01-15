import Link from 'next/link';

import { A, Column, Row } from '@kocherga/frontkit';

import { AsyncButton, AsyncButtonWithConfirm } from '~/components';

import {
  MastermindDatingCohortDetailsFragment as Cohort,
  useMastermindDatingRunSolverMutation,
  useMastermindDatingDeleteCohortMutation,
} from '../queries.generated';

import CohortEventLink from './CohortEventLink';
import { useCallback } from 'react';

interface Props {
  cohort: Cohort;
}

const Controls: React.FC<Props> = ({ cohort }) => {
  const [runSolver] = useMastermindDatingRunSolverMutation({
    variables: {
      cohort_id: cohort.id,
    },
  });

  const [deleteCohortMutation] = useMastermindDatingDeleteCohortMutation({
    variables: {
      cohort_id: cohort.id,
    },
  });

  const deleteCohort = useCallback(async () => {
    await deleteCohortMutation();
    window.location.href = '/team/mastermind_dating';
  }, [deleteCohortMutation]);

  return (
    <Column>
      <Link href="/team/mastermind_dating" passHref>
        <A>&larr; к списку когорт</A>
      </Link>
      <div style={{ alignSelf: 'stretch' }}>
        <CohortEventLink cohort={cohort} />
      </div>
      <Row>
        <AsyncButtonWithConfirm act={deleteCohort} confirmText="Удалить">
          Удалить
        </AsyncButtonWithConfirm>
        <AsyncButton act={runSolver}>Запустить алгоритм</AsyncButton>
      </Row>
    </Column>
  );
};

export default Controls;

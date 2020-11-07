import Link from 'next/link';
import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { AsyncButtonWithConfirm } from '~/components';
import { A, AsyncButton, Column, Row } from '~/frontkit';

import {
    MastermindDatingCohortDetailsFragment as Cohort, MastermindDatingDeleteCohortDocument,
    MastermindDatingRunSolverDocument
} from '../queries.generated';
import { mastermindDatingRootRoute } from '../routes';
import CohortEventLink from './CohortEventLink';

interface Props {
  cohort: Cohort;
}

const Controls: React.FC<Props> = ({ cohort }) => {
  const [runSolver] = useMutation(MastermindDatingRunSolverDocument, {
    variables: {
      cohort_id: cohort.id,
    },
  });

  const [deleteCohortMutation] = useMutation(
    MastermindDatingDeleteCohortDocument,
    {
      variables: {
        cohort_id: cohort.id,
      },
    }
  );

  const deleteCohort = useCallback(async () => {
    await deleteCohortMutation();
    window.location.href = mastermindDatingRootRoute();
  }, [deleteCohortMutation]);

  return (
    <Column>
      <Link href={mastermindDatingRootRoute()} passHref>
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

import { useCallback } from 'react';

import { ApolloQueryResults } from '~/components';

import { Collection, CustomCardListView } from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import {
  MastermindDatingCohortSummaryFragment as CohortFragment,
  useMastermindDatingCohortsQuery,
  useMastermindDatingCreateCohortMutation,
} from '../../queries.generated';

import CohortItem from './CohortItem';

const cohortShape: FormShape = [];

const CohortCollection: React.FC = () => {
  const queryResults = useMastermindDatingCohortsQuery();
  const [createMutation] = useMastermindDatingCreateCohortMutation({
    refetchQueries: ['MastermindDatingCohorts'],
    awaitRefetchQueries: true,
  });

  const renderItem = useCallback(
    (cohort: CohortFragment) => <CohortItem cohort={cohort} />,
    []
  );

  const add = useCallback(async () => {
    await createMutation();
  }, [createMutation]);

  return (
    <ApolloQueryResults {...queryResults} size="block">
      {({ data: { cohorts } }) => (
        <Collection
          names={{
            plural: 'когорты',
            genitive: 'когорту',
          }}
          items={cohorts}
          add={{
            cb: add,
            shape: cohortShape,
          }}
          view={props => (
            <CustomCardListView {...props} renderItem={renderItem} />
          )}
        />
      )}
    </ApolloQueryResults>
  );
};

export default CohortCollection;

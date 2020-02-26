import { useCallback } from 'react';

import { isBefore, parseISO } from 'date-fns';

import { usePermissions } from '~/common/hooks';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import {
  PagedApolloCollection,
  CustomCardListView,
} from '~/components/collections';

import { FormShape } from '~/components/forms/types';

import {
  useRatioTrainingsQuery,
  useRatioAddTrainingMutation,
  TrainingFragment,
} from '../queries.generated';

import TrainingCard from './TrainingCard';

const trainingShape: FormShape = [
  {
    name: 'name',
    optional: false,
    title: 'Название',
    type: 'string',
  },
  {
    name: 'slug',
    optional: false,
    title: 'slug',
    type: 'string',
  },
  {
    name: 'date',
    optional: false,
    title: 'Дата начала',
    type: 'date',
  },
];

interface CreateTrainingParams {
  name: string;
  slug: string;
  date: string;
}

const isMuted = (training: TrainingFragment) =>
  isBefore(parseISO(training.date), new Date());

const TrainingCollectionBlock: React.FC = () => {
  const [canCreate] = usePermissions(['ratio.manage']);

  const queryResults = useRatioTrainingsQuery({
    variables: {
      first: 20,
    },
  });
  const [addTrainingMutation] = useRatioAddTrainingMutation({
    refetchQueries: ['RatioTrainings'],
    awaitRefetchQueries: true,
  });

  const renderItem = useCallback(
    (training: TrainingFragment) => <TrainingCard training={training} />,
    []
  );

  const add = useCallback(
    async (values: CreateTrainingParams) => {
      await addTrainingMutation({
        variables: {
          params: values,
        },
      });
    },
    [addTrainingMutation]
  );

  return (
    <PaddedBlock width="max">
      <ApolloQueryResults {...queryResults} size="block">
        {({ data: { trainings } }) => (
          <PagedApolloCollection
            connection={trainings}
            fetchPage={queryResults.refetch}
            names={{
              plural: 'тренинги',
              genitive: 'тренинг',
            }}
            add={canCreate ? { cb: add, shape: trainingShape } : undefined}
            view={props => (
              <CustomCardListView
                {...props}
                renderItem={renderItem}
                isMuted={isMuted}
              />
            )}
          />
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default TrainingCollectionBlock;

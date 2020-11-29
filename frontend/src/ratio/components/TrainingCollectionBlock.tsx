import { isBefore, parseISO } from 'date-fns';
import { useCallback } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { usePermissions } from '~/common/hooks';
import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CustomCardListView, PagedApolloCollection } from '~/components/collections';
import { AnyViewProps } from '~/components/collections/types';
import { ShapeToValues } from '~/components/forms/types';

import {
    RatioAddTrainingDocument, RatioTraining_SummaryFragment, RatioTrainingsDocument
} from '../queries.generated';
import TrainingCard from './trainings/TrainingCard';

const trainingShape = [
  {
    name: 'name',
    title: 'Название',
    type: 'string',
  },
  {
    name: 'slug',
    title: 'slug',
    type: 'string',
  },
  {
    name: 'date',
    optional: true,
    title: 'Дата начала',
    type: 'date',
  },
  {
    name: 'telegram_link',
    optional: true,
    title: 'Ссылка на Telegram-чат',
    type: 'string',
  },
] as const;

type CreateTrainingValues = ShapeToValues<typeof trainingShape>;

const isMuted = (training: RatioTraining_SummaryFragment) =>
  training.date ? isBefore(parseISO(training.date), new Date()) : false;

const renderItem = (training: RatioTraining_SummaryFragment) => (
  <TrainingCard training={training} />
);

const View: React.FC<AnyViewProps<RatioTraining_SummaryFragment>> = (props) => (
  <CustomCardListView
    {...props}
    renderItem={renderItem}
    isMuted={isMuted}
    item2key={(training) => training.id}
  />
);

interface Props {
  eternal: boolean;
}

const TrainingCollectionBlock: React.FC<Props> = ({ eternal }) => {
  const [canCreate] = usePermissions(['ratio.manage']);

  const queryResults = useQuery(RatioTrainingsDocument, {
    variables: {
      first: 20,
      eternal,
    },
  });
  const [addTrainingMutation] = useMutation(RatioAddTrainingDocument, {
    refetchQueries: ['RatioTrainings'],
    awaitRefetchQueries: true,
  });

  const add = useCallback(
    async (values: CreateTrainingValues) => {
      const params = { ...values } as Omit<CreateTrainingValues, 'date'> & {
        date?: string;
      };
      if (!params.date) {
        delete params.date; // don't pass empty date
      }
      await addTrainingMutation({
        variables: {
          params,
        },
      });
    },
    [addTrainingMutation]
  );

  return (
    <PaddedBlock width="wide">
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
            view={View}
          />
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default TrainingCollectionBlock;

import { isBefore, parseISO } from 'date-fns';
import { useCallback } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { usePermissions } from '~/common/hooks';
import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CustomCardListView, PagedApolloCollection } from '~/components/collections';
import { AnyViewProps } from '~/components/collections/types';
import { FormShape } from '~/components/forms/types';

import {
    RatioAddTrainingDocument, RatioTrainingFragment, RatioTrainingsDocument
} from '../queries.generated';
import TrainingCard from './trainings/TrainingCard';

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
  {
    name: 'telegram_link',
    optional: false,
    title: 'Ссылка на Telegram-чат',
    type: 'string',
  },
];

interface CreateTrainingParams {
  name: string;
  slug: string;
  date: string;
  telegram_link: string;
}

const isMuted = (training: RatioTrainingFragment) =>
  isBefore(parseISO(training.date), new Date());

const renderItem = (training: RatioTrainingFragment) => (
  <TrainingCard training={training} />
);

const View: React.FC<AnyViewProps<RatioTrainingFragment>> = (props) => (
  <CustomCardListView
    {...props}
    renderItem={renderItem}
    isMuted={isMuted}
    item2key={(training) => training.id}
  />
);

const TrainingCollectionBlock: React.FC = () => {
  const [canCreate] = usePermissions(['ratio.manage']);

  const queryResults = useQuery(RatioTrainingsDocument, {
    variables: {
      first: 20,
    },
  });
  const [addTrainingMutation] = useMutation(RatioAddTrainingDocument, {
    refetchQueries: ['RatioTrainings'],
    awaitRefetchQueries: true,
  });

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
            view={View}
          />
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default TrainingCollectionBlock;

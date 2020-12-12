import { isBefore, parseISO } from 'date-fns';
import { useCallback } from 'react';

import { useQuery } from '@apollo/client';

import { usePermissions } from '~/common/hooks';
import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CustomCardListView, PagedApolloCollection } from '~/components/collections';
import { useFormModalSmartMutation } from '~/components/forms/hooks';
import { ShapeToValues } from '~/components/forms/types';

import {
    CreateRatioTrainingDocument, RatioTraining_SummaryFragment, RatioTrainingsDocument
} from './queries.generated';
import TrainingCard from './TrainingCard';

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
  const addTrainingMutation = useFormModalSmartMutation(
    CreateRatioTrainingDocument,
    {
      refetchQueries: ['RatioTrainings'],
      expectedTypename: 'RatioTraining',
    }
  );

  const add = useCallback(
    async (values: CreateTrainingValues) => {
      const input = { ...values } as Omit<CreateTrainingValues, 'date'> & {
        date?: string;
      };
      if (!input.date) {
        delete input.date; // don't pass empty date
      }
      return await addTrainingMutation({
        variables: {
          input,
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
            view={({ items }) => (
              <CustomCardListView
                items={items}
                renderItem={renderItem}
                isMuted={isMuted}
                item2key={(training) => training.id}
              />
            )}
          />
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default TrainingCollectionBlock;

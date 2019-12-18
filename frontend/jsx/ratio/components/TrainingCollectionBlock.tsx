import { useCallback } from 'react';

import { isBefore } from 'date-fns';

import shapes from '~/shapes';

import { usePermissions, useDispatch } from '~/common/hooks';

import { PaddedBlock } from '~/components';
import { PagedCollection, CustomCardListView } from '~/components/collections';

import { FormShape } from '~/components/forms/types';

import { addTraining, trainingsFeature } from '../features/trainings';
import { Training, CreateTrainingParams } from '../types';

import TrainingCard from './TrainingCard';

const trainingShape: FormShape = shapes.ratio.training.filter(
  field => !field.readonly
);

const isMuted = (training: Training) =>
  isBefore(new Date(training.date), new Date());

const TrainingCollectionBlock: React.FC = () => {
  const dispatch = useDispatch();
  const [canCreate] = usePermissions(['ratio.manage']);

  const renderItem = useCallback(
    (training: Training) => <TrainingCard training={training} />,
    []
  );

  const add = useCallback(
    async (values: CreateTrainingParams) => {
      await dispatch(addTraining(values));
    },
    [dispatch, addTraining]
  );

  return (
    <PaddedBlock width="max">
      <PagedCollection
        feature={trainingsFeature}
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
    </PaddedBlock>
  );
};

export default TrainingCollectionBlock;

import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { isBefore } from 'date-fns';

import shapes from '~/shapes';

import { usePermissions, useDispatch } from '~/common/hooks';

import { PaddedBlock } from '~/components';
import { Collection, CustomCardListView } from '~/components/collections';

import { FormShape } from '~/components/forms/types';

import { addTraining, selectTrainings } from '../features/trainings';
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

  const trainings = useSelector(selectTrainings);

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
      <Collection
        names={{
          plural: 'тренинги',
          genitive: 'тренинг',
        }}
        items={trainings}
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

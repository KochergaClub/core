import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isBefore } from 'date-fns';

import { usePermissions } from '~/common/hooks';

import Collection from '~/components/collections/Collection';
import CardListView from '~/components/collections/CardListView';

import { FormShape } from '~/components/forms/types';

import { addTraining } from '../actions';
import { Training, CreateTrainingParams } from '../types';

import { selectTrainings } from '../selectors';

import TrainingCard from './TrainingCard';

const trainingShape: FormShape = [
  { name: 'name', type: 'string' },
  { name: 'slug', type: 'string' },
  { name: 'date', type: 'date' },
];

const isMuted = (training: Training) =>
  isBefore(new Date(training.date), new Date());

const TrainingCollection: React.FC = () => {
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
    <Collection
      title="Тренинги"
      entityName="тренинг"
      items={trainings}
      add={canCreate ? add : undefined}
      shape={trainingShape}
      renderItem={renderItem}
      view={props => <CardListView {...props} isMuted={isMuted} />}
    />
  );
};

export default TrainingCollection;

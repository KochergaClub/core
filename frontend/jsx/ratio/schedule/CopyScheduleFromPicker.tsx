import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Column, Button } from '@kocherga/frontkit';

import { loadTrainings } from '../actions';
import { selectTrainings } from '../selectors';
import { Training } from '../types';

interface Props {
  training: Training;
  pick: (srcTraining: Training) => void;
}

export default function CopyScheduleFromPicker(props: Props) {
  const trainings = useSelector(selectTrainings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTrainings());
  }, [dispatch]);

  if (!trainings.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>Расписания нет. Скопировать?</header>
      <Column>
        {trainings.map(srcTraining => (
          <Button
            key={srcTraining.slug}
            onClick={() => props.pick(srcTraining)}
          >
            {srcTraining.name}
          </Button>
        ))}
      </Column>
    </div>
  );
}

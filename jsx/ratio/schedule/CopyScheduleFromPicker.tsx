import React, { useState, useEffect, useCallback } from 'react';

import { Column, Button } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { copyScheduleFrom, getTrainings } from '../api';
import { Training } from '../types';

interface Props {
  training: Training;
  pick: (srcTraining: Training) => void;
}

export default function CopyScheduleFromPicker(props: Props) {
  const api = useAPI();

  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    (async () => {
      setTrainings(await getTrainings(api));
    })();
  }, []);

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

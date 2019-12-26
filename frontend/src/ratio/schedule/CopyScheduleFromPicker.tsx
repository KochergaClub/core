import { Column, Button } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';

import {
  TrainingForPickerFragment,
  useRatioTrainingsForPickerQuery,
} from '../queries.generated';

interface Props {
  pick: (srcTraining: TrainingForPickerFragment) => void;
}

export default function CopyScheduleFromPicker(props: Props) {
  const queryResults = useRatioTrainingsForPickerQuery();

  if (queryResults.loading) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloQueryResults {...queryResults}>
      {({
        data: {
          trainings: { nodes: trainings },
        },
      }) => (
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
      )}
    </ApolloQueryResults>
  );
}

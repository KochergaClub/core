import { Column } from '@kocherga/frontkit';

import { AsyncButton, ApolloQueryResults } from '~/components';

import {
  TrainingForPickerFragment,
  useRatioTrainingsForPickerQuery,
} from '../queries.generated';

interface Props {
  pick: (srcTraining: TrainingForPickerFragment) => Promise<void>;
  excludeSlug: string;
}

export default function CopyScheduleFromPicker(props: Props) {
  const queryResults = useRatioTrainingsForPickerQuery();

  return (
    <div>
      <header>Расписания нет. Скопировать?</header>
      <ApolloQueryResults {...queryResults}>
        {({
          data: {
            trainings: { nodes: trainings },
          },
        }) => (
          <Column>
            {trainings
              .filter(training => training.slug !== props.excludeSlug)
              .map(srcTraining => (
                <AsyncButton
                  key={srcTraining.slug}
                  act={() => props.pick(srcTraining)}
                >
                  {srcTraining.name}
                </AsyncButton>
              ))}
          </Column>
        )}
      </ApolloQueryResults>
    </div>
  );
}

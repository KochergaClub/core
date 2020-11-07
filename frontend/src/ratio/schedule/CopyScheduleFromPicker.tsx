import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { AsyncButton, Column } from '~/frontkit';

import { RatioTrainingsForPickerDocument, TrainingForPickerFragment } from '../queries.generated';

interface Props {
  pick: (srcTraining: TrainingForPickerFragment) => Promise<void>;
  excludeSlug: string;
}

export default function CopyScheduleFromPicker(props: Props) {
  const queryResults = useQuery(RatioTrainingsForPickerDocument, {
    variables: {
      first: 20,
    },
  });

  return (
    <div>
      <header>Расписания нет. Скопировать?</header>
      <ApolloQueryResults {...queryResults}>
        {({
          data: {
            trainings: { edges: trainingEdges },
          },
        }) => {
          const trainings = trainingEdges.map((edge) => edge.node);

          return (
            <Column>
              {trainings
                .filter((training) => training.slug !== props.excludeSlug)
                .map((srcTraining) => (
                  <AsyncButton
                    key={srcTraining.slug}
                    act={() => props.pick(srcTraining)}
                  >
                    {srcTraining.name}
                  </AsyncButton>
                ))}
            </Column>
          );
        }}
      </ApolloQueryResults>
    </div>
  );
}

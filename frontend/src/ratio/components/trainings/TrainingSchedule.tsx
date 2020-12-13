import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { RatioTrainingWithScheduleDocument } from '~/ratio/queries.generated';
import SchedulePage from '~/ratio/schedule';

type Props = {
  slug: string;
};

export const TrainingSchedule: React.FC<Props> = ({ slug }) => {
  const queryResults = useQuery(RatioTrainingWithScheduleDocument, {
    variables: { slug },
  });

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { training } }) => <SchedulePage training={training} />}
    </ApolloQueryResults>
  );
};

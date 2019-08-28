import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';

import { selectTrainings } from '~/ratio/selectors';

const TrainingList: React.FC = () => {
  const trainings = useSelector(selectTrainings);

  return (
    <CardList>
      {trainings.map(training => (
        <Card key={training.slug}>
          <Link
            href="/team/ratio/training/[slug]"
            as={`/team/ratio/training/${training.slug}`}
            passHref
          >
            <A>
              {training.date} {training.name}
            </A>
          </Link>
        </Card>
      ))}
    </CardList>
  );
};

export default TrainingList;

import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { isBefore } from 'date-fns';

import { A, Row, Label } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';
import MutedCard from '~/components/MutedCard';

import { selectTrainings } from '~/ratio/selectors';
import { Training } from '../types';

const TrainingCard: React.FC<{ training: Training }> = ({ training }) => {
  const Wrapper = isBefore(new Date(training.date), new Date())
    ? MutedCard
    : Card;

  return (
    <Wrapper key={training.slug}>
      <Link
        href="/team/ratio/training/[slug]"
        as={`/team/ratio/training/${training.slug}`}
        passHref
      >
        <A>{training.name}</A>
      </Link>
      <Row vCentered>
        <Label>Дата:</Label>
        <div>{training.date}</div>
      </Row>
    </Wrapper>
  );
};

const TrainingList: React.FC = () => {
  const trainings = useSelector(selectTrainings);

  return (
    <CardList>
      {trainings.map(training => (
        <TrainingCard key={training.slug} training={training} />
      ))}
    </CardList>
  );
};

export default TrainingList;

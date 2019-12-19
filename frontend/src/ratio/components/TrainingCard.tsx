import Link from 'next/link';

import { A, Row, Label } from '@kocherga/frontkit';

import { Training } from '../types';

const TrainingCard: React.FC<{ training: Training }> = ({ training }) => {
  return (
    <div>
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
      <Row vCentered>
        <Label>Билетов:</Label>
        <div>{training.tickets_count}</div>
      </Row>
      <Row vCentered>
        <Label>Суммарный доход:</Label>
        <div>{training.total_income}</div>
      </Row>
    </div>
  );
};

export default TrainingCard;

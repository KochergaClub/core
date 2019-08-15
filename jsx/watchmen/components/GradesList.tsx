import React from 'react';
import { useSelector } from 'react-redux';

import { Column } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';

import { selectGrades } from '../selectors';
import { Grade } from '../types';

const GradeItem = ({ grade }: { grade: Grade }) => (
  <Card>
    <Column>
      <strong>{grade.code}</strong>
      <div>Коэффициент: x{grade.multiplier}</div>
    </Column>
  </Card>
);

const GradesList = () => {
  const grades = useSelector(selectGrades);
  return (
    <div>
      <h2>Грейды</h2>
      <CardList>
        {grades.map(grade => (
          <GradeItem grade={grade} key={grade.id} />
        ))}
      </CardList>
    </div>
  );
};

export default GradesList;

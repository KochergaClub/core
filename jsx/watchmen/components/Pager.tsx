import React from 'react';

import { subWeeks, addWeeks, format } from 'date-fns';

import { A, Row } from '@kocherga/frontkit';

import { Link } from 'react-router-dom';

interface Props {
  from_date: Date;
}

const Pager: React.FC<Props> = ({ from_date }) => {
  const prev = subWeeks(from_date, 1);
  const next = addWeeks(from_date, 1);
  return (
    <Row gutter={16}>
      <Link to={`?from_date=${format(prev, 'yyyy-MM-dd')}`}>&larr; назад</Link>
      <A href={`/team/watchmen`}>Текущая неделя</A>
      <Link to={`?from_date=${format(next, 'yyyy-MM-dd')}`}>вперёд &rarr;</Link>
    </Row>
  );
};

export default Pager;

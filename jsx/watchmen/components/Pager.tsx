import React from 'react';

import moment from 'moment';

import { A, Row } from '@kocherga/frontkit';

const Pager = ({ from_date }: { from_date: moment.Moment }) => {
  const prev = moment(from_date).subtract(1, 'week');
  const next = moment(from_date).add(1, 'week');
  return (
    <Row gutter={16}>
      <A href={`?from_date=${prev.format('YYYY-MM-DD')}`}>&larr; назад</A>
      <A href={`/team/watchmen`}>Текущая неделя</A>
      <A href={`?from_date=${next.format('YYYY-MM-DD')}`}>вперёд &rarr;</A>
    </Row>
  );
};

export default Pager;

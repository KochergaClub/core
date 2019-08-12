import React from 'react';

import { subWeeks, addWeeks, format } from 'date-fns';

import { A, Row } from '@kocherga/frontkit';

import Link from 'next/link';

interface Props {
  from_date: Date;
}

const Pager: React.FC<Props> = ({ from_date }) => {
  const prev = subWeeks(from_date, 1);
  const next = addWeeks(from_date, 1);
  return (
    <Row gutter={16}>
      <Link
        href={{
          pathname: '/team/watchmen',
          query: { from_date: format(prev, 'yyyy-MM-dd') },
        }}
        passHref
      >
        <A>&larr; назад</A>
      </Link>
      <Link href="/team/watchmen" passHref>
        <A>Текущая неделя</A>
      </Link>
      <Link
        href={{
          pathname: '/team/watchmen',
          query: { from_date: format(next, 'yyyy-MM-dd') },
        }}
        passHref
      >
        <A>вперёд &rarr;</A>
      </Link>
    </Row>
  );
};

export default Pager;

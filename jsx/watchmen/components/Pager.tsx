import React from 'react';

import { UrlObject } from 'url';
import { subWeeks, addWeeks, format } from 'date-fns';

import { A, Row } from '@kocherga/frontkit';

import Link from 'next/link';

interface Props {
  from_date: Date;
}

const PagerLink: React.FC<{ query: { [key: string]: any } }> = ({
  query,
  children,
}) => (
  <Link
    href={{
      pathname: '/team/watchmen',
      query,
    }}
    scroll={false}
    passHref
  >
    <A>{children}</A>
  </Link>
);

const Pager: React.FC<Props> = ({ from_date }) => {
  const prev = subWeeks(from_date, 1);
  const next = addWeeks(from_date, 1);
  return (
    <Row gutter={16}>
      <PagerLink query={{ from_date: format(prev, 'yyyy-MM-dd') }}>
        &larr; назад
      </PagerLink>
      <PagerLink query={{}}>Текущая неделя</PagerLink>
      <PagerLink query={{ from_date: format(next, 'yyyy-MM-dd') }}>
        вперёд &rarr;
      </PagerLink>
    </Row>
  );
};

export default Pager;

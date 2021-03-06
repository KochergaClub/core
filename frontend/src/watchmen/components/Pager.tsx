import { addWeeks, format, subWeeks } from 'date-fns';
import Link from 'next/link';

import { A, Row } from '~/frontkit';

import { watchmenShiftsRoute } from '../routes';

interface Props {
  from_date: Date;
}

const PagerLink: React.FC<{ query: { [key: string]: string } }> = ({
  query,
  children,
}) => (
  <Link
    href={{
      pathname: watchmenShiftsRoute(),
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

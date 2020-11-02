import { useCallback } from 'react';

import { A, Row } from '~/frontkit';

import { PagerProps } from './types';

export default function Pager({ next, previous, pageInfo }: PagerProps) {
  const hasNext = pageInfo.hasNextPage;
  const hasPrevious = pageInfo.hasPreviousPage;

  const nextCb = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      await next();
    },
    [next]
  );

  const previousCb = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      await previous();
    },
    [previous]
  );

  if (!hasNext && !hasPrevious) {
    return null; // everything fits on a single page
  }

  return (
    <Row spaced>
      {hasPrevious ? (
        <A href="" onClick={previousCb}>
          &larr; Назад
        </A>
      ) : (
        <span>&nbsp;</span>
      )}
      {hasNext ? (
        <A href="" onClick={nextCb}>
          Вперёд &rarr;
        </A>
      ) : (
        <span>&nbsp;</span>
      )}
    </Row>
  );
}

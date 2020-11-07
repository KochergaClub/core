import { AsyncButton, HR, Row } from '~/frontkit';

import { PagerProps } from './types';

export default function Pager(props: PagerProps) {
  const hasNext = props.pageInfo.hasNextPage;
  const hasPrevious = props.pageInfo.hasPreviousPage;

  if (!hasNext && !hasPrevious) {
    return null; // everything fits on a single page
  }

  return (
    <div>
      <HR />
      <Row spaced>
        <AsyncButton act={props.previous} disabled={!hasPrevious}>
          &larr; Предыдущая страница
        </AsyncButton>
        <AsyncButton act={props.next} disabled={!hasNext}>
          Cледующая страница &rarr;
        </AsyncButton>
      </Row>
    </div>
  );
}

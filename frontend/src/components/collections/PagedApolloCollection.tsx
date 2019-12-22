import { Row, HR } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import { Collection } from '~/components/collections';
import { AnyViewProps, EntityNames } from '~/components/collections/types';
import { FormShape } from '~/components/forms/types';

interface PagerProps {
  pageInfo: {
    hasNextPage: boolean;
    pageNumber: number;
  };
  next: () => Promise<void>;
  previous: () => Promise<void>;
}

function Pager(props: PagerProps) {
  const hasNext = props.pageInfo.hasNextPage;
  const hasPrevious = props.pageInfo.pageNumber > 1;

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
        <div>Страница {props.pageInfo.pageNumber}</div>
        <AsyncButton act={props.next} disabled={!hasNext}>
          Cледующая страница &rarr;
        </AsyncButton>
      </Row>
    </div>
  );
}

interface Props<T, A extends {}> {
  connection: {
    pageInfo: {
      hasNextPage: boolean;
      pageNumber: number;
    };
    edges: {
      node: T;
    }[];
  };
  fetchPage: (page: number) => Promise<void>;
  names: EntityNames;
  add?: {
    shape: FormShape;
    cb: (values: A) => Promise<void>;
  };
  view?: React.ElementType<AnyViewProps<T>>;
}

function PagedApolloCollection<T, A extends {}>(props: Props<T, A>) {
  const items = props.connection.edges.map(edge => edge.node);
  return (
    <div>
      <Collection
        names={props.names}
        items={items}
        add={props.add}
        view={props.view}
      />
      <Pager
        pageInfo={props.connection.pageInfo}
        next={async () => {
          await props.fetchPage(props.connection.pageInfo.pageNumber + 1);
        }}
        previous={async () => {
          await props.fetchPage(props.connection.pageInfo.pageNumber - 1);
        }}
      />
    </div>
  );
}

export default PagedApolloCollection;

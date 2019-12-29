import { Row, HR } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import { Collection } from '~/components/collections';
import { AnyViewProps, EntityNames } from '~/components/collections/types';
import { FormShape } from '~/components/forms/types';

interface PagerProps {
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  next: () => Promise<void>;
  previous: () => Promise<void>;
}

function Pager(props: PagerProps) {
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

interface Props<T, A extends {}> {
  connection: {
    pageInfo: {
      // TODO - PageInfoGragment
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: {
      node: T;
    }[];
  };
  fetchPage: ({
    before,
    after,
  }: {
    before?: string | null;
    after?: string | null;
  }) => Promise<any>;
  names: EntityNames;
  add?: {
    shape: FormShape;
    cb: (values: A) => Promise<void>;
  };
  view?: React.ElementType<AnyViewProps<T>>;
}

function PagedApolloCollection<T, A extends {}>(props: Props<T, A>) {
  return (
    <div>
      <Collection
        names={props.names}
        items={props.connection.edges.map(edge => edge.node)}
        add={props.add}
        view={props.view}
      />
      <Pager
        pageInfo={props.connection.pageInfo}
        next={async () => {
          await props.fetchPage({ after: props.connection.pageInfo.endCursor });
        }}
        previous={async () => {
          await props.fetchPage({
            before: props.connection.pageInfo.startCursor,
          });
        }}
      />
    </div>
  );
}

export default PagedApolloCollection;

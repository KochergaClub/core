import { AsyncButton } from '~/components';
import { Collection } from '~/components/collections';
import { AnyViewProps, EntityNames } from '~/components/collections/types';
import { FormShape } from '~/components/forms/types';
import { HR, Row } from '~/frontkit';

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
  pageSize?: number;
  fetchPage: ({
    before,
    after,
    first,
    last,
  }?: {
    before?: string | null;
    after?: string | null;
    first?: number | null;
    last?: number | null;
  }) => Promise<unknown>;
  names: EntityNames;
  add?: {
    shape: FormShape;
    cb: (values: A) => Promise<void>;
  };
  view?: React.ElementType<AnyViewProps<T>>;
}

function PagedApolloCollection<T, A extends {}>(props: Props<T, A>) {
  const DEFAULT_PAGE_SIZE = 20;
  return (
    <div>
      <Collection
        names={props.names}
        items={props.connection.edges.map((edge) => edge.node)}
        add={props.add}
        refetch={props.fetchPage}
        view={props.view}
      />
      <Pager
        pageInfo={props.connection.pageInfo}
        next={async () => {
          await props.fetchPage({
            after: props.connection.pageInfo.endCursor,
            before: null,
            first: props.pageSize || DEFAULT_PAGE_SIZE,
            last: null,
          });
        }}
        previous={async () => {
          await props.fetchPage({
            after: null,
            before: props.connection.pageInfo.startCursor,
            first: null,
            last: props.pageSize || DEFAULT_PAGE_SIZE,
          });
        }}
      />
    </div>
  );
}

export default PagedApolloCollection;

import { FormShape, ModalPostResult, ShapeToValues } from '~/components/forms/types';

import { Collection } from './';
import HeadlessConnection from './HeadlessConnection';
import Pager from './Pager';
import { AnyViewProps, EntityNames } from './types';

interface Props<T, S extends FormShape> {
  connection: {
    pageInfo: {
      // TODO - PageInfoFragment
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
  fetchPage: (args?: {
    before?: string | null;
    after?: string | null;
    first?: number | null;
    last?: number | null;
  }) => Promise<unknown>;
  names: EntityNames;
  add?: {
    shape: S;
    cb: (values: ShapeToValues<S>) => Promise<ModalPostResult | void>;
  };
  view?: React.ElementType<AnyViewProps<T>>;
}

function PagedApolloCollection<T, S extends FormShape>(props: Props<T, S>) {
  return (
    <HeadlessConnection
      connection={props.connection}
      fetchPage={props.fetchPage}
      pageSize={props.pageSize}
    >
      {({ items, next, previous }) => (
        <div>
          <Collection
            names={props.names}
            items={items}
            add={props.add}
            refetch={props.fetchPage}
            view={props.view}
          />
          <Pager
            pageInfo={props.connection.pageInfo}
            next={next}
            previous={previous}
          />
        </div>
      )}
    </HeadlessConnection>
  );
}

export default PagedApolloCollection;

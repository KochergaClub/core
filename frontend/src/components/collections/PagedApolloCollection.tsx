import { AnyFormValues, FormShape } from '~/components/forms/types';

import { Collection } from './';
import HeadlessConnection from './HeadlessConnection';
import Pager from './Pager';
import { AnyViewProps, EntityNames } from './types';

interface Props<T, A extends AnyFormValues> {
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
    shape: FormShape;
    cb: (values: A) => Promise<void>;
  };
  view?: React.ElementType<AnyViewProps<T>>;
}

function PagedApolloCollection<T, A extends AnyFormValues>(props: Props<T, A>) {
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

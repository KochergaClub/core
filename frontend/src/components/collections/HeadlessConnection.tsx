interface CbProps<D> {
  next: () => Promise<void>;
  previous: () => Promise<void>;
  items: D[];
}

interface Props<D> {
  fetchPage: (args?: {
    before?: string | null;
    after?: string | null;
    first?: number | null;
    last?: number | null;
  }) => Promise<unknown>;
  connection: {
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
    edges: {
      node: D;
    }[];
  };
  pageSize?: number;
  children: (props: CbProps<D>) => React.ReactElement | null;
}

const DEFAULT_PAGE_SIZE = 20;
function HeadlessConnection<D>({
  fetchPage,
  connection,
  pageSize = DEFAULT_PAGE_SIZE,
  children,
}: Props<D>) {
  const next = async () => {
    await fetchPage({
      after: connection.pageInfo.endCursor,
      before: null,
      first: pageSize,
      last: null,
    });
  };
  const previous = async () => {
    await fetchPage({
      after: null,
      before: connection.pageInfo.startCursor,
      first: null,
      last: pageSize,
    });
  };

  return children({
    next,
    previous,
    items: connection.edges.map((edge) => edge.node),
  });
}

export default HeadlessConnection;

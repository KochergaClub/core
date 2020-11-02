export interface AnyViewProps<I> {
  items: I[];
  item2key?: (item: I) => string; // TODO - required
}

export interface EntityNames {
  plural?: string;
  genitive?: string;
}

export interface PagerProps {
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  next: () => Promise<void>;
  previous: () => Promise<void>;
}

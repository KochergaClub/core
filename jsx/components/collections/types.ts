export interface AnyViewProps<I> {
  items: I[];
  renderItem: (item: I) => React.ReactElement;
}

export interface EntityNames {
  plural?: string;
  genitive?: string;
}

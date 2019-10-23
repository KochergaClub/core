export interface AnyViewProps<I> {
  items: I[];
  renderItem: (item: I) => React.ReactElement;
}

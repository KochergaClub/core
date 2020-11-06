import { Column } from '~/frontkit';

import { AnyViewProps } from './types';

interface Props<I> extends AnyViewProps<I> {
  renderItem: (item: I) => React.ReactElement;
  gutter?: number;
}

function ListView<I>(props: Props<I>) {
  return (
    <Column stretch gutter={props.gutter}>
      {props.items.map((item, i) => (
        <div key={i}>{props.renderItem(item)}</div>
      ))}
    </Column>
  );
}

export default ListView;

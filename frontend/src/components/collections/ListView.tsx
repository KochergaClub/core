import { Column } from '~/frontkit';

import { AnyViewProps } from './types';

interface Props<I> extends AnyViewProps<I> {
  renderItem: (item: I) => React.ReactElement;
}

function ListView<I>(props: Props<I>) {
  return (
    <Column stretch>
      {props.items.map((item, i) => (
        <div key={i}>{props.renderItem(item)}</div>
      ))}
    </Column>
  );
}

export default ListView;

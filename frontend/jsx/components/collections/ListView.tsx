import { Column } from '@kocherga/frontkit';

import { AnyViewProps as Props } from './types';

import ItemDump from './ItemDump';

function ListView<I>(props: Props<I>) {
  return (
    <Column stretch>
      {props.items.map((item, i) =>
        props.renderItem ? (
          props.renderItem(item)
        ) : (
          <ItemDump item={item} shape={props.shape} key={i} />
        )
      )}
    </Column>
  );
}

export default ListView;

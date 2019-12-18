import Card, { CardList } from '~/components/Card';

import { FormShape } from '~/components/forms/types';
import { AnyViewProps } from './types';

import ItemDump from './ItemDump';

interface Props<I> extends AnyViewProps<I> {
  shape: FormShape;
}

function ShapedCardListView<I>(props: Props<I>) {
  return (
    <CardList>
      {props.items.map((item, i) => (
        <Card key={i}>
          <ItemDump item={item} shape={props.shape} />
        </Card>
      ))}
    </CardList>
  );
}

export default ShapedCardListView;

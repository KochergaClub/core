import { Row, Label } from '~/frontkit';

import { FormShape } from '~/components/forms/types';

interface Props<Item> {
  item: Item;
  shape: FormShape;
}

export default function ItemDump<I>(props: Props<I>) {
  const { shape, item } = props;

  return (
    <div>
      {shape.map(field => (
        <Row key={field.name} vCentered>
          <Label>{field.title || field.name}:</Label>
          <div>{(item as any)[field.name] || 'undefined'}</div>
        </Row>
      ))}
    </div>
  );
}

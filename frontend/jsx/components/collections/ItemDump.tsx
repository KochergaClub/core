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
        <div key={field.name}>{(item as any)[field.name] || 'undefined'}</div>
      ))}
    </div>
  );
}

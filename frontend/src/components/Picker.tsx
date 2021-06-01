interface Props<T> {
  loading?: boolean;
  picked: (item: T) => void;
  item2text: (item: T) => string;
  item2color?: (item: T) => string;
  items: T[];
}

interface ItemProps {
  text: string;
  color: string;
  picked: () => void;
}

const PickerItem = ({ text, color, picked }: ItemProps) => {
  return (
    <div
      className="cursor-pointer px-4 hover:filter hover:brightness-90"
      style={{ backgroundColor: color }}
      onClick={picked}
    >
      {text}
    </div>
  );
};

export function Picker<T>(props: Props<T>) {
  const { loading, items, item2text, item2color } = props;
  return (
    <div className="absolute t-8 ml-1 min-w-full z-10 shadow-floating select-none">
      {loading ? (
        <div>loading...</div>
      ) : (
        items.map((item, i) => (
          <PickerItem
            key={i}
            text={item2text(item)}
            color={item2color ? item2color(item) : 'white'}
            picked={() => props.picked(item)}
          />
        ))
      )}
    </div>
  );
}

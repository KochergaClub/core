import clsx from 'clsx';

interface ItemProps {
  selected?: boolean;
  select: () => void;
}

const Item: React.FC<ItemProps> = ({ select, selected, children }) => {
  return (
    <li
      className={clsx(
        'cursor-pointer px-2.5 py-2 font-bold text-sm uppercase border-0 border-solid',
        selected
          ? 'border-b-4 border-gray-400'
          : 'hover:border-b-4 hover:border-gray-300'
      )}
      onClick={select}
    >
      {children}
    </li>
  );
};

interface IListProps {
  children: React.ReactNode;
}

export const RowNav = (({ children }: IListProps) => (
  <nav>
    <ul className="list-none p-0 flex">{children}</ul>
  </nav>
)) as React.FC & {
  Item: React.ComponentType<ItemProps>;
};

RowNav.Item = Item;

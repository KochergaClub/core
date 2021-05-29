import { AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';

interface ItemProps {
  selected?: boolean;
  select: () => void;
}

const ColumnNavItem: React.FC<ItemProps> = ({ selected, select, children }) => {
  return (
    <li className="relative" onClick={select}>
      <div className="px-6 py-4 cursor-pointer text-sm hover:text-primary-500">
        {children}
      </div>
      {selected && (
        <motion.div
          className="absolute -z-10 inset-0 bg-highlight"
          layoutId="highlight"
        />
      )}
    </li>
  );
};

interface IListProps {
  children: React.ReactNode;
}

export const ColumnNav = (({ children }: IListProps) => (
  <nav>
    <AnimateSharedLayout>
      <ul className="list-none p-0 relative z-0">{children}</ul>
    </AnimateSharedLayout>
  </nav>
)) as React.FC & { Item: React.FC<ItemProps> };

ColumnNav.Item = ColumnNavItem;

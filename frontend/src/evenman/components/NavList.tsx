import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface ListProps {
  title?: string;
}

export const NavList: React.FC<ListProps> = ({ children, title }) => (
  <nav>
    {title && <header className="px-4 py-1 text-gray-600">{title}</header>}
    <ul className="bg-white list-none p-0 m-0 border-b border-gray-300 relative">
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </ul>
  </nav>
);

interface ItemProps {
  selected?: boolean;
  select: () => void;
}

export const NavListItem: React.FC<ItemProps> = ({
  select,
  selected,
  children,
}) => {
  return (
    <motion.li
      className={clsx(
        'px-4 py-1 text-xs border-t border-gray-300 cursor-pointer',
        selected ? 'bg-highlight' : 'bg-white hover:bg-gray-100'
      )}
      onClick={() => select()}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.li>
  );
};

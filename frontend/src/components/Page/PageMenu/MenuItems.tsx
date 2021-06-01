import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';

import { usePermissions } from '~/common/hooks';

import { MenuKind } from '../types';
import { ExpandableItem, Item, kind2color, kind2items, MenuContext, SingleItem } from './constants';

const linkClassName =
  'block text-xs uppercase tracking-widest no-underline text-white hover:text-gray-300';

const ItemLink: React.FC<{ item: SingleItem }> = ({ item }) => {
  const cn = clsx(
    linkClassName,
    item.highlight &&
      'font-bold text-top-menu-highlight hover:text-top-menu-highlight-hover'
  );

  if (item.mode === 'external') {
    return (
      <a href={item.link} className={cn}>
        {item.title}
      </a>
    );
  }
  return (
    <Link href={item.link}>
      <a className={cn}>{item.title}</a>
    </Link>
  );
};

const useHasAllPermissions = (item: SingleItem) => {
  const permissions = usePermissions(item.permissions || []);

  if (
    permissions.length &&
    permissions.length !== permissions.filter((p) => p === true).length
  ) {
    return false;
  }
  return true;
};

const MenuSingleItem: React.FC<{ item: SingleItem }> = ({ item }) => {
  const allowed = useHasAllPermissions(item);

  if (!allowed) {
    return null;
  }

  return (
    <li>
      <ItemLink item={item} />
    </li>
  );
};

const MenuDropdownChildItem: React.FC<{ item: SingleItem }> = ({ item }) => {
  const allowed = useHasAllPermissions(item);

  if (!allowed) {
    return null;
  }

  return (
    <li className="px-4 py-1.5">
      <ItemLink item={item} />
    </li>
  );
};

const preventClick = (e: React.SyntheticEvent) => {
  e.preventDefault();
};

const MenuExpandableItem: React.FC<{ item: ExpandableItem }> = ({ item }) => {
  const [revealed, setRevealed] = useState(false);
  const revealDropdown = useCallback(() => setRevealed(true), []);
  const hideDropdown = useCallback(() => setRevealed(false), []);

  const { kind } = useContext(MenuContext);

  return (
    <li
      className="relative"
      onMouseOver={revealDropdown}
      onMouseLeave={hideDropdown}
    >
      <a href="#" className={linkClassName} onClick={preventClick}>
        {item.title} ▼
      </a>
      <AnimatePresence>
        {revealed && (
          <motion.ul
            className={clsx(
              'absolute list-none px-0 py-1 z-50 overflow-hidden border border-white',
              kind2color[kind]
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {item.items.map((item, i) => (
              <MenuDropdownChildItem key={i} item={item} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

const isExpandableItem = (item: Item): item is ExpandableItem => {
  return (item as ExpandableItem).items !== undefined;
};

const MenuItem: React.FC<{ item: Item }> = ({ item }) =>
  isExpandableItem(item) ? (
    <MenuExpandableItem item={item} />
  ) : (
    <MenuSingleItem item={item} />
  );

interface Props {
  kind: MenuKind;
}

export const MenuItems: React.FC<Props> = ({ kind }) => {
  const items = kind2items[kind];
  return (
    <nav>
      <ul className="list-none p-0 flex flex-col items-center space-y-5 lg:flex-row lg:space-x-8 lg:space-y-0">
        {items.map((item, i) => (
          <MenuItem item={item} key={i} />
        ))}
      </ul>
    </nav>
  );
};

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import { usePermissions } from '~/common/hooks';
import { colors } from '~/frontkit';

import { MenuKind } from '../types';
import { ExpandableItem, Item, kind2color, kind2items, SingleItem, styled } from './constants';

const MenuItemsNav = styled.nav`
  margin-left: 30px;
  color: white;
  @media screen and (max-width: 980px) {
    margin-left: 0;
  }
`;

const MenuItemsList = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;

  & > li {
    margin-right: 30px;
  }

  a {
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 12px;
    display: block;
  }

  a:hover {
    text-decoration: none;
    color: ${colors.grey[300]};
  }

  a > strong {
    color: hsl(120, 40%, 55%);
    font-weight: bold;
  }
  a:hover > strong {
    color: hsl(120, 40%, 45%);
  }

  @media screen and (max-width: 980px) {
    padding-left: 0;
    flex-direction: column;
    margin-bottom: 10px;
    & > li {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-right: 0;
    }
  }
`;

const ItemLink: React.FC<{ item: SingleItem }> = ({ item }) => {
  const content = item.highlight ? (
    <strong>{item.title}</strong>
  ) : (
    <>{item.title}</>
  );
  if (item.mode === 'external') {
    return <a href={item.link}>{content}</a>;
  }
  return (
    <Link href={item.link}>
      <a>{content}</a>
    </Link>
  );
};

const MenuSingleItem: React.FC<{ item: SingleItem }> = ({ item }) => {
  const permissions = usePermissions(item.permissions || []);

  if (
    permissions.length &&
    permissions.length !== permissions.filter((p) => p === true).length
  ) {
    return null;
  }

  return (
    <li>
      <ItemLink item={item} />
    </li>
  );
};

const MenuItemExpandableContainer = styled.li`
  position: relative;
`;

const MenuItemDropdown = styled(motion.ul)`
  position: absolute;
  z-index: 2000;
  overflow: hidden;
  min-width: 180px;
  max-width: 300px;

  padding: 5px 0;
  list-style-type: none;
  border: 1px solid white;
  background: ${(props) => kind2color[props.theme.kind]};
  color: white;

  & > li {
    padding: 5px 15px;
  }
`;

const MenuItemExpandable: React.FC<{ item: ExpandableItem }> = ({ item }) => {
  const [revealed, setRevealed] = useState(false);

  const revealDropdown = useCallback(() => setRevealed(true), []);

  const hideDropdown = useCallback(() => setRevealed(false), []);

  const preventClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <MenuItemExpandableContainer
      onMouseOver={revealDropdown}
      onMouseLeave={hideDropdown}
    >
      <a href="#" onClick={preventClick}>
        {item.title} ▼
      </a>
      <AnimatePresence>
        {revealed && (
          <MenuItemDropdown
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {item.items.map((item, i) => (
              <MenuSingleItem key={i} item={item} />
            ))}
          </MenuItemDropdown>
        )}
      </AnimatePresence>
    </MenuItemExpandableContainer>
  );
};

const isExpandableItem = (item: Item): item is ExpandableItem => {
  return (item as ExpandableItem).items !== undefined;
};

const MenuItemMaybeExpandable: React.FC<{ item: Item }> = ({ item }) =>
  isExpandableItem(item) ? (
    <MenuItemExpandable item={item} />
  ) : (
    <MenuSingleItem item={item} />
  );

interface Props {
  kind: MenuKind;
}

const MenuItems: React.FC<Props> = ({ kind }) => {
  const items = kind2items[kind];
  return (
    <MenuItemsNav>
      <MenuItemsList>
        {items.map((item, i) => (
          <MenuItemMaybeExpandable item={item} key={i} />
        ))}
      </MenuItemsList>
    </MenuItemsNav>
  );
};

export default MenuItems;

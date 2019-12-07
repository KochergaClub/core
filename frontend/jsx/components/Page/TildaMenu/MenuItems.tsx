import { useCallback, useState } from 'react';
import styled from 'styled-components';

import Link from 'next/link';

import { colors } from '@kocherga/frontkit';
import { usePermissions } from '~/common/hooks';

import {
  teamColor,
  SingleItem,
  ExpandableItem,
  Item,
  publicMenuItems,
  teamMenuItems,
} from './constants';

const MenuItemsNav = styled.nav`
  margin-left: 30px;
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
    font-size: 13px;
    display: block;
  }

  a:hover {
    text-decoration: none;
    color: ${colors.grey[200]};
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
  if (item.mode === 'next') {
    return (
      <Link href={item.link}>
        <a>{item.title}</a>
      </Link>
    );
  }
  if (item.mode === 'wagtail') {
    return (
      <Link href="/wagtail-any" as={item.link}>
        <a>{item.title}</a>
      </Link>
    );
  }
  return <a href={item.link}>{item.title}</a>;
};

const MenuSingleItem: React.FC<{ item: SingleItem }> = ({ item }) => {
  const permissions = usePermissions(item.permissions || []);

  if (
    permissions.length &&
    permissions.length !== permissions.filter(p => p === true).length
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

const MenuItemDropdown = styled.ul`
  position: absolute;
  z-index: 2000;

  padding: 5px 0;
  list-style-type: none;
  border: 1px solid white;
  background: ${props => (props.theme.team ? teamColor : 'black')};
  color: white;

  & > li {
    padding: 5px 15px;
  }
`;

const MenuItemExpandable: React.FC<{ item: ExpandableItem }> = ({ item }) => {
  const [revealed, setRevealed] = useState(false);

  const revealDropdown = useCallback(() => setRevealed(true), []);

  const hideDropdown = useCallback(() => setRevealed(false), []);

  const renderDropdown = () => {
    return (
      <MenuItemDropdown>
        {item.items.map((item, i) => (
          <MenuSingleItem key={i} item={item} />
        ))}
      </MenuItemDropdown>
    );
  };

  return (
    <MenuItemExpandableContainer
      onMouseOver={revealDropdown}
      onMouseLeave={hideDropdown}
    >
      <a href="#">{item.title} ▼</a>
      {revealed && renderDropdown()}
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
  team: boolean;
}

const TildaMenuItems: React.FC<Props> = ({ team }) => {
  const items = team ? teamMenuItems : publicMenuItems;
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

export default TildaMenuItems;
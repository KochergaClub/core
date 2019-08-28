import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';

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
  }

  a:hover {
    text-decoration: none;
  }

  @media screen and (max-width: 980px) {
    flex-direction: column;
    margin-bottom: 10px;
    & > li {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
`;

const ItemLink = ({ item }: { item: SingleItem }) => {
  if (item.mode === 'old') {
    return <a href={`https://kocherga-club.ru + ${item.link}`}>{item.title}</a>;
  }
  if (item.mode === 'next') {
    return (
      <Link href={item.link}>
        <a>{item.title}</a>
      </Link>
    );
  }
  if (item.mode === 'wagtail') {
    return (
      <Link href="/wagtail-api" as={item.link}>
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
  position: fixed;
  z-index: 1;

  padding: 5px 0;
  list-style-type: none;
  border: 1px solid white;
  background: ${props => (props.theme.team ? teamColor : 'black')};
  color: white;

  & > li {
    padding: 5px 15px;
  }
`;

class MenuItemExpandable extends React.Component<{ item: ExpandableItem }, {}> {
  state = {
    revealed: false,
  };

  revealDropdown = () => {
    this.setState({
      revealed: true,
    });
  };

  hideDropdown = () => {
    this.setState({
      revealed: false,
    });
  };

  renderDropdown() {
    return (
      <MenuItemDropdown>
        {this.props.item.items.map((item, i) => (
          <MenuSingleItem key={i} item={item} />
        ))}
      </MenuItemDropdown>
    );
  }

  render() {
    return (
      <MenuItemExpandableContainer
        onMouseOver={this.revealDropdown}
        onMouseLeave={this.hideDropdown}
      >
        <a href="#">{this.props.item.title} ▼</a>
        {this.state.revealed && this.renderDropdown()}
      </MenuItemExpandableContainer>
    );
  }
}

const isExpandableItem = (item: Item): item is ExpandableItem => {
  return (item as ExpandableItem).items !== undefined;
};

const MenuItemMaybeExpandable = ({ item }: { item: Item }) =>
  isExpandableItem(item) ? (
    <MenuItemExpandable item={item} />
  ) : (
    <ItemLink item={item} />
  );

interface Props {
  team: boolean;
}

const TildaMenuItems = ({ team }: Props) => {
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

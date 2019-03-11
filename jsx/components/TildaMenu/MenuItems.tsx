import React from 'react';
import styled from 'styled-components';

import { teamColor, MenuItem, publicMenuItems, teamMenuItems } from './constants';

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
    font-weight: 500;
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

const item2link = (item: MenuItem) => {
  if (item.old) {
    return 'https://kocherga-club.ru' + item.link;
  }
  return item.link;
};

const MenuItemExpandableContainer = styled.div`
  position: relative;
`;

const MenuItemDropdown = styled.ul`
  position: fixed;
  z-index: 1;

  padding: 5px 0;
  list-style-type: none;
  border: 1px solid white;
  background: ${props => props.theme.team ? teamColor : 'black'};
  color: white;

  & > li {
    padding: 5px 15px;
  }
`;

class MenuItemExpandable extends React.Component<{ item: MenuItem }, {}> {
  state = {
    revealed: false,
  };

  revealDropdown = () => {
    this.setState({
      revealed: true,
    })
  }

  hideDropdown = () => {
    this.setState({
      revealed: false,
    })
  }

  renderDropdown() {
    return (
      <MenuItemDropdown>
        {
          this.props.item.items.map(
            (item, i) => <li key={i}><a href={item2link(item)}>{item.title}</a></li>
          )
        }
      </MenuItemDropdown>
    );

  }

  render() {
    return (
      <MenuItemExpandableContainer onMouseOver={this.revealDropdown} onMouseLeave={this.hideDropdown}>
        <a href="#">{this.props.item.title} ▼</a>
        { this.state.revealed && this.renderDropdown() }
      </MenuItemExpandableContainer>
    );
  }
}

const MenuItemLi = ({ item }: { item: MenuItem }) => (
  <li>
    {
      item.items
      ? <MenuItemExpandable item={item} />
      : <a href={item2link(item)}>{item.title}</a>
    }
  </li>
);

interface Props {
  team: boolean;
}

const TildaMenuItems = ({ team }: Props) => {
  const items = team ? teamMenuItems : publicMenuItems;
  return (
    <MenuItemsNav>
      <MenuItemsList>
        {
          items.map(
            (item, i) => (
              <MenuItemLi item={item} key={i} />
            )
          )
        }
      </MenuItemsList>
    </MenuItemsNav>
  );
};

export default TildaMenuItems;

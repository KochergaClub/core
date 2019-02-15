import React from 'react';
import styled from 'styled-components';

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
`;

const menuItems = [
  {
    title: 'Антикафе',
    items: [
      { link: '/space', title: 'Пространство' },
      { link: '/projects', title: 'Проекты' },
    ],
  },
  { link: '/', title: 'Рациональность' },
  { link: '/#contacts', title: 'Контакты' },
];

interface DropdownProps {
  item: {
    title: string;
    link: string;
  }
}

class MenuItemDropdown extends React.Component<DropdownProps, {}> {
  revealDropdown = () => {
    
  }

  render() {
    return (
      <div>
        <a href="#" onMouseOver={this.revealDropdown}>{this.props.item.title} ▼</a>
      </div>
    );
  }
}

const MenuItem = ({ item }) => (
  <li>
    {
      item.items
      ? <a href="#">{item.title} ▼</a>
      : <a href={item.link}>{item.title}</a>
    }
  </li>
);

const TildaMenuItems = () => (
  <MenuItemsNav>
    <MenuItemsList>
      {
        menuItems.map(
          (item, i) => (
            <MenuItem item={item} key={i} />
          )
        )
      }
    </MenuItemsList>
  </MenuItemsNav>
);

export default TildaMenuItems;

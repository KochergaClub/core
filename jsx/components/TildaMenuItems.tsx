import * as React from 'react';
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

  @media screen and (max-width: 980px) {
    flex-direction: column;
    margin-bottom: 10px;
    & > li {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
`;

interface MenuItem {
  title: string;
  link?: string;
  items?: { title: string, link: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Антикафе',
    items: [
      { link: '/space', title: 'Пространство' },
      { link: '/projects', title: 'Проекты' },
      { link: '/pricing', title: 'Цены' },
      { link: '/#schedule', title: 'Расписание' },
      { link: '/faq', title: 'F.A.Q.' },
    ],
  },
  {
    title: 'Рациональность',
    items: [
      { link: '/rationality', title: 'Прикладная рациональность' },
      { link: '/rationality/resources', title: 'Ресурсы' },
      { link: '/rationality/reports', title: 'Отчеты' },
      { link: '/rationality/aboutus', title: 'О нас говорят' },
      { link: '/workshop', title: 'Воркшоп' },
      { link: '/rationality/corporate', title: 'Корпоративные тренинги' },
      { link: '/blog', title: 'Блог' },
    ],
  },
  { link: '/#contacts', title: 'Контакты' },
];

const MenuItemExpandableContainer = styled.div`
  position: relative;
`;

const MenuItemDropdown = styled.ul`
  position: fixed;
  z-index: 1;

  padding: 5px 0;
  list-style-type: none;
  border: 1px solid white;
  background: black;
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
            (item, i) => <li key={i}><a href={"https://kocherga-club.ru" + item.link}>{item.title}</a></li>
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

const MenuItem = ({ item }: { item: MenuItem }) => (
  <li>
    {
      item.items
      ? <MenuItemExpandable item={item} />
      : <a href={"https://kocherga-club.ru" + item.link}>{item.title}</a>
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

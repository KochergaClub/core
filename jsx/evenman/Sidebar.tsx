import { observer } from 'mobx-react-lite';

import Link from 'next/link';
import Router from 'next/router';

import styled from 'styled-components';

import { Column, ColumnNav } from '@kocherga/frontkit';
import { useRootStore } from './common';

const LogoLink = styled.a`
  color: black;
  font-size: 24px;
  padding: 0 10px;

  text-decoration: none;
  &:hover {
    color: black;
    text-decoration: underline;
  }
`;

const tabs = [
  { path: '/schedule', title: 'Расписание', viewName: 'Schedule' },
  { path: '', title: 'События', viewName: 'Event' },
  {
    path: '/event-prototypes',
    title: 'Прототипы событий',
    viewName: 'EventPrototype',
  },
];

const MainNav = observer(() => {
  const store = useRootStore();
  return (
    <ColumnNav>
      {tabs.map(({ path, title, viewName }) => (
        <ColumnNav.Item
          key={path}
          selected={viewName === store!.currentView.name}
          select={() => Router.push(`/team/evenman${path}`)}
        >
          {title}
        </ColumnNav.Item>
      ))}
    </ColumnNav>
  );
});

export const Sidebar = observer(() => {
  return (
    <Column stretch spaced>
      <Column stretch>
        <header>
          <Link href="/team/evenman" passHref>
            <LogoLink>Event Manager</LogoLink>
          </Link>
        </header>
        <MainNav />
      </Column>
    </Column>
  );
});

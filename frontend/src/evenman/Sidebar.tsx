import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import styled from 'styled-components';

import { Column, ColumnNav } from '@kocherga/frontkit';

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

const MainNav = ({ selected }: { selected: string }) => {
  return (
    <ColumnNav>
      {tabs.map(({ path, title, viewName }) => (
        <ColumnNav.Item
          key={path}
          selected={viewName === selected}
          select={() => Router.push(`/team/evenman${path}`)}
        >
          {title}
        </ColumnNav.Item>
      ))}
    </ColumnNav>
  );
};

const Sidebar = ({ selected }: { selected: string }) => {
  return (
    <Column stretch spaced>
      <Column stretch>
        <header>
          <Link href="/team/evenman" passHref>
            <LogoLink>Event Manager</LogoLink>
          </Link>
        </header>
        <MainNav selected={selected} />
      </Column>
    </Column>
  );
};

export default React.memo(Sidebar);

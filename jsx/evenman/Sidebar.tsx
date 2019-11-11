import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import styled from 'styled-components';

import { FaSignOutAlt } from 'react-icons/fa';
import { Button, Column, ColumnNav } from '@kocherga/frontkit';
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
  ['Schedule', 'Расписание'],
  ['Event', 'События'],
  ['EventPrototype', 'Прототипы событий'],
  ['Templater', 'Шаблоны картинок'],
];

const MainNav = observer(() => {
  const store = useRootStore();
  return (
    <ColumnNav>
      {tabs.map(tab => (
        <ColumnNav.Item
          key={tab[0]}
          selected={tab[0] === store!.currentView.name}
          select={() => store!.switchView(tab[0])}
        >
          {tab[1]}
        </ColumnNav.Item>
      ))}
    </ColumnNav>
  );
});

export const Sidebar = observer(() => {
  const store = useRootStore();

  const clickLogo = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      e.preventDefault();
      store!.switchView('Event'); // FIXME
    },
    [store]
  );

  return (
    <Column stretch spaced>
      <Column stretch>
        <header>
          <LogoLink href="#" onClick={clickLogo}>
            Event Manager
          </LogoLink>
        </header>
        <MainNav />
      </Column>
      <div style={{ padding: 10 }}>
        <FaSignOutAlt />
      </div>
    </Column>
  );
});

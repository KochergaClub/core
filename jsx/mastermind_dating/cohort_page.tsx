import * as React from 'react';

import styled from 'styled-components';

import Page from '../components/Page';
import TeamMenu from '../components/TeamMenu';

import { Column, Row } from '@kocherga/frontkit';

const Photo = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * + * {
    margin-left: 20px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
`;

const Users = ({ users }) => (
  <UserList>
  {
    users.map(
      user => (
        <UserContainer>
          <Column centered>
          <span>{user.user}</span>
          <strong>{user.name || "НЕЗАРЕГИСТРИРОВАН"}</strong>
          <small>{user.desc}</small>
          </Column>
          <Photo src={user.photo} />
        </UserContainer>
      )
    )
  }
  </UserList>
);

export default ({ cohort_id, users }) => (
  <Page title="Аналитика мастермайнд-дейтинга">
    <TeamMenu />
    <h1>Мастермайнд-дейтинг</h1>
    <section>
      <a href="/team/mastermind_dating">&larr; к списку когорт</a>
    </section>
    <h1>Когорта {cohort_id}</h1>
    <Users users={users} />
  </Page>
);

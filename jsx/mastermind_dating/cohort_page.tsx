import * as React from 'react';

import styled from 'styled-components';

import Page from '../components/Page';
import TeamMenu from '../components/TeamMenu';

import { Column, Button } from '@kocherga/frontkit';

const Photo = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * + * {
    margin-left: 15px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  margin-bottom: 40px;
`;

const UserDescription = styled.small`
  line-height: 1.3;
  text-align: center;
`;

const userActionUrl = (action: string, uid: number) => `/team/mastermind_dating/action/${action}/${uid}`;

const UserVoteForm = ({ user, csrfToken }) => (
  <form action={userActionUrl('tinder_activate', user.user_id)} method="post">
    <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
    {
      user.voted_for
      ? (<em>Уже проголосовали</em>)
      : <Button type="submit" size="small">Активировать голосование</Button>
    }
  </form>
);

const Users = ({ users, csrfToken }) => (
  <UserList>
  {
    users.map(
      user => (
        <UserContainer key={user.user_id}>
          <Column centered>
          <span>{user.user}</span>
          <strong>{user.name || "НЕ ЗАРЕГИСТРИРОВАН"}</strong>
          <UserDescription>{user.desc}</UserDescription>
          </Column>
          <Column centered>
            <Photo src={user.photo} />
            <form action={userActionUrl('flip_present', user.user_id)} method="post">
              <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
              {
              user.present
              ? <Button type="submit" size="small">Тут</Button>
              : <Button type="submit" size="small">Не тут</Button>
              }
            </form>
            {
            user.present && <UserVoteForm user={user} csrfToken={csrfToken} />
            }
          </Column>
        </UserContainer>
      )
    )
  }
  </UserList>
);

export default ({ cohort_id, users, csrfToken }) => (
  <Page title="Аналитика мастермайнд-дейтинга">
    <TeamMenu />
    <h1>Мастермайнд-дейтинг</h1>
    <section>
      <a href="/team/mastermind_dating">&larr; к списку когорт</a>
    </section>
    <h1>Когорта {cohort_id}</h1>
    <Users users={users} csrfToken={csrfToken} />
  </Page>
);

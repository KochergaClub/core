import * as React from 'react';

import styled from 'styled-components';

import CSRFInput from '../components/CSRFInput';
import Page from '../components/Page';

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
  margin-bottom: 80px;
`;

const UserDescription = styled.small`
  line-height: 1.3;
  text-align: center;
`;

const userActionUrl = (action: string, uid: number) =>
  `/team/mastermind_dating/action/${action}/${uid}`;

const UserVoteForm = ({ user }) => (
  <form action={userActionUrl('tinder_activate', user.user_id)} method="post">
    <CSRFInput />
    {user.voted_for ? (
      <em>Уже проголосовали</em>
    ) : (
      <Button type="submit" small>
        Активировать голосование
      </Button>
    )}
  </form>
);

const Users = ({ users }) => (
  <UserList>
    {users.map(user => (
      <UserContainer key={user.user_id}>
        <Column centered>
          <span>{user.user}</span>
          <strong>{user.name || 'НЕ ЗАРЕГИСТРИРОВАН'}</strong>
        </Column>
        <UserDescription>{user.desc}</UserDescription>
        <Column centered>
          <Photo src={user.photo} />
          <form
            action={userActionUrl('flip_present', user.user_id)}
            method="post"
          >
            <CSRFInput />
            {user.present ? (
              <Button type="submit" small>
                Тут
              </Button>
            ) : (
              <Button type="submit" small>
                Не тут
              </Button>
            )}
          </form>
          {user.present && <UserVoteForm user={user} />}
        </Column>
      </UserContainer>
    ))}
  </UserList>
);

export default ({ cohort_id, users }) => (
  <Page title="Аналитика мастермайнд-дейтинга" team>
    <h1>Мастермайнд-дейтинг</h1>
    <section>
      <a href="/team/mastermind_dating">&larr; к списку когорт</a>
    </section>
    <h1>Когорта {cohort_id}</h1>
    <Users users={users} />
  </Page>
);

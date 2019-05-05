import React from 'react';

import styled from 'styled-components';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';
import ActionButton from '../components/ActionButton';

import { Column } from '@kocherga/frontkit';

import { User } from './types';

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

const userActionPath = (action: string, uid: number) =>
  `mastermind_dating/user/${uid}/${action}`;

const UserVoteForm = ({ user }: { user: User }) => {
  if (user.voted_for) {
    return <em>Уже проголосовали</em>;
  }

  return (
    <ActionButton path={userActionPath('tinder_activate', user.user_id)}>
      Активировать голосование
    </ActionButton>
  );
};

const Users = ({ users }: { users: User[] }) => (
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
          <ActionButton
            path={userActionPath('flip_present', user.user_id)}
            onSuccess={
              () => window.location.reload()
              /* There's a race condition here; button becomes enabled again before the page reloads. Also, page reloads suck. */
            }
          >
            {user.present ? 'Тут' : 'Не тут'}
          </ActionButton>
          {user.present && <UserVoteForm user={user} />}
        </Column>
      </UserContainer>
    ))}
  </UserList>
);

interface Props {
  cohort_id: number;
  users: User[];
  children?: React.ReactNode;
}

const MastermindCohortPage = ({ cohort_id, users }: Props) => (
  <Page title="Аналитика мастермайнд-дейтинга" team>
    <h1>Мастермайнд-дейтинг</h1>
    <section>
      <a href="/team/mastermind_dating">&larr; к списку когорт</a>
    </section>
    <h1>Когорта {cohort_id}</h1>
    <Users users={users} />
  </Page>
);

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  const users = await api.call(
    `mastermind_dating/cohort/${params.id}/users`,
    'GET'
  );
  return {
    cohort_id: params.id,
    users,
  };
};

const screen: Screen<Props> = {
  component: MastermindCohortPage,
  getInitialData,
};

export default screen;

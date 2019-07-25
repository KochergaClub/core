import * as React from 'react';

import styled from 'styled-components';

import { Column } from '@kocherga/frontkit';

import ActionButton from '~/components/ActionButton';

import { User } from '../types';

const Photo = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const UserListContainer = styled.div`
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

const UserList = ({ users }: { users: User[] }) => (
  <UserListContainer>
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
            reloadOnSuccess
            /* There's a race condition here; button becomes enabled again before the page reloads. Also, page reloads suck. */
          >
            {user.present ? 'Тут' : 'Не тут'}
          </ActionButton>
          {user.present && <UserVoteForm user={user} />}
        </Column>
      </UserContainer>
    ))}
  </UserListContainer>
);

export default UserList;

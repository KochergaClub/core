import React from 'react';

import styled from 'styled-components';

import { User, Cohort } from '../../../types';

import UserCard from './UserCard';

const UserListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * + * {
    margin-left: 15px;
  }
`;

const UserList = ({ users, cohort }: { users: User[]; cohort: Cohort }) => {
  return (
    <UserListContainer>
      {users.map(user => (
        <UserCard key={user.user_id} user={user} cohort={cohort} />
      ))}
    </UserListContainer>
  );
};

export default UserList;

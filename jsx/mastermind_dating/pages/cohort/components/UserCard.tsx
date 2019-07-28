import React from 'react';

import styled from 'styled-components';

import { Column, colors, fonts } from '@kocherga/frontkit';

import ActionButton from '~/components/ActionButton';

import { User, Cohort } from '../../../types';

import { useCohortUsersReloader } from '../hooks';

const Photo = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const EmptyPhotoContainer = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid ${colors.grey[300]};
  text-align: center;
  font-size: ${fonts.sizes.XL};
  color: ${colors.grey[700]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyPhoto = () => {
  return <EmptyPhotoContainer>Нет фото</EmptyPhotoContainer>;
};

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin-bottom: 80px;
`;

const UserDescription = styled.small`
  line-height: 1.3;
  text-align: center;
`;

const userActionPath = (action: string, uid: number) =>
  `mastermind_dating/user/${uid}/${action}`;

interface Props {
  user: User;
  cohort: Cohort;
}

const UserVoteForm: React.FC<Props> = ({ user, cohort }) => {
  const cohortUsersReloader = useCohortUsersReloader(cohort);

  if (user.voted_for) {
    return <em>Уже проголосовали</em>;
  }

  return (
    <ActionButton
      path={userActionPath('tinder_activate', user.user_id)}
      asyncOnSuccess={cohortUsersReloader}
    >
      Активировать голосование
    </ActionButton>
  );
};

const UserCard: React.FC<Props> = props => {
  const { user, cohort } = props;

  const cohortUsersReloader = useCohortUsersReloader(cohort);

  return (
    <UserContainer key={user.user_id}>
      <Column centered>
        <span>{user.user}</span>
        <strong>{user.name || 'НЕ ЗАРЕГИСТРИРОВАН'}</strong>
      </Column>
      <UserDescription>{user.desc}</UserDescription>
      <Column centered>
        {user.photo ? <Photo src={user.photo} /> : <EmptyPhoto />}
        <ActionButton
          path={userActionPath('flip_present', user.user_id)}
          asyncOnSuccess={cohortUsersReloader}
        >
          {user.present ? 'Тут' : 'Не тут'}
        </ActionButton>
        {user.present && <UserVoteForm {...props} />}
      </Column>
    </UserContainer>
  );
};

export default UserCard;

import React, { useState } from 'react';

import { Button, Column, Row } from '@kocherga/frontkit';

import ActionButton from '~/components/ActionButton';

import { Cohort, User } from '../../../types';

import { useCohortUsersReloader } from '../hooks';

import UserList from './UserList';
import CreateUserButton from './CreateUserButton';

interface Props {
  cohort: Cohort;
  users: User[];
}

const UserSection: React.FC<Props> = ({ cohort, users }) => {
  const uninvitedCount = users.filter(u => !u.invite_email_sent).length;

  const cohortUsersReloader = useCohortUsersReloader(cohort);

  const [hideUnregistered, setHideUnregistered] = useState(false);

  const shownUsers = hideUnregistered ? users.filter(user => user.name) : users;

  return (
    <section>
      <h1>Участники</h1>
      <Column gutter={32}>
        <Row>
          <CreateUserButton cohort={cohort} />
          {cohort.event_id && (
            <ActionButton
              path={`/mastermind_dating/cohort/${
                cohort.id
              }/populate_from_event`}
              asyncOnSuccess={cohortUsersReloader}
            >
              Загрузить участников из события
            </ActionButton>
          )}
          {uninvitedCount ? (
            <ActionButton
              path={`/mastermind_dating/cohort/${cohort.id}/send_invite_emails`}
              asyncOnSuccess={cohortUsersReloader}
            >
              Разослать приглашения в бота ({uninvitedCount}/{users.length})
            </ActionButton>
          ) : null}
          {
            <Button onClick={() => setHideUnregistered(!hideUnregistered)}>
              {hideUnregistered
                ? 'Незарегистрировавшиеся скрыты'
                : 'Незарегистрировавшиеся показаны'}
            </Button>
          }
        </Row>
        <UserList users={shownUsers} cohort={cohort} />
      </Column>
    </section>
  );
};

export default UserSection;

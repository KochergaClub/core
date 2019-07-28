import React from 'react';

import { Column, Row } from '@kocherga/frontkit';

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

  return (
    <section>
      <h1>Участники</h1>
      <Column>
        <Row>
          {cohort.event_id && (
            <ActionButton
              path={`/mastermind_dating/cohort/${
                cohort.id
              }/populate_from_event`}
              onSuccess={cohortUsersReloader}
            >
              Загрузить пользователей из события
            </ActionButton>
          )}
          {uninvitedCount ? (
            <ActionButton
              path={`/mastermind_dating/cohort/${cohort.id}/send_invite_emails`}
              onSuccess={cohortUsersReloader}
            >
              Разослать приглашения в бота ({uninvitedCount}/{users.length})
            </ActionButton>
          ) : null}
        </Row>
        <UserList users={users} />
        <CreateUserButton cohort={cohort} />
      </Column>
    </section>
  );
};

export default UserSection;

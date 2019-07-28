import React from 'react';

import { A } from '@kocherga/frontkit';

import ActionButton from '~/components/ActionButton';

import { Cohort, User, Group } from '../../../types';

interface Props {
  cohort: Cohort;
  users: User[];
  groups: Group[];
}

const GroupInfo = ({ group }: { group: Group }) => {
  return (
    <div>
      <div>
        <A href={group.telegram_invite_link}>{group.telegram_invite_link}</A>
      </div>
      <div>Участников: {group.users.length}</div>
    </div>
  );
};

const GroupSection: React.FC<Props> = ({ cohort, groups }) => {
  return (
    <section>
      <h1>Группы</h1>
      {groups.map(group => (
        <GroupInfo key={group.id} group={group} />
      ))}

      {cohort.leader_telegram_uid && (
        <ActionButton
          path={`/mastermind_dating/cohort/${cohort.id}/create_group`}
        >
          Создать группу
        </ActionButton>
      )}
    </section>
  );
};

export default GroupSection;

import React from 'react';

import { A } from '@kocherga/frontkit';

import ActionButton from '~/components/ActionButton';

import { Cohort, Participant, Group } from '../../../types';

import { useCohortGroupsReloader } from '../hooks';

interface Props {
  cohort: Cohort;
  participants: Participant[];
  groups: Group[];
}

const GroupInfo = ({ group }: { group: Group }) => {
  return (
    <div>
      <div>
        <A href={group.telegram_invite_link}>{group.telegram_invite_link}</A>
      </div>
      <div>Участников: {group.participants.length}</div>
    </div>
  );
};

const GroupSection: React.FC<Props> = ({ cohort, groups }) => {
  const cohortGroupsReloader = useCohortGroupsReloader(cohort);

  return (
    <section>
      <h1>Группы</h1>
      {groups.map(group => (
        <GroupInfo key={group.id} group={group} />
      ))}

      {cohort.leader_telegram_uid && (
        <ActionButton
          path={`/mastermind_dating/cohort/${cohort.id}/create_group`}
          asyncOnSuccess={cohortGroupsReloader}
        >
          Создать группу
        </ActionButton>
      )}
    </section>
  );
};

export default GroupSection;

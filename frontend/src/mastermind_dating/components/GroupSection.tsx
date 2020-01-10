import { A, Label } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import {
  MastermindDatingCohortDetailsFragment as Cohort,
  MastermindDatingGroupFragment as Group,
  useMastermindDatingCreateGroupMutation,
} from '../queries.generated';

interface Props {
  cohort: Cohort;
}

const GroupInfo = ({ group }: { group: Group }) => {
  return (
    <div>
      <div>
        <A href={group.telegram_invite_link}>{group.telegram_invite_link}</A>
      </div>
      <div>
        {group.participants.length ? (
          <>
            <Label>Участники:</Label>
            <ul>
              {group.participants.map(participant => (
                <li key={participant.id}>{participant.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <Label>Пустая группа</Label>
        )}
      </div>
    </div>
  );
};

const GroupSection: React.FC<Props> = ({ cohort }) => {
  const [createGroupMutation] = useMastermindDatingCreateGroupMutation({
    variables: {
      cohort_id: cohort.id,
    },
  });

  return (
    <section>
      <h1>Группы</h1>
      {cohort.groups.map(group => (
        <GroupInfo key={group.id} group={group} />
      ))}

      {cohort.leader_telegram_uid && (
        <AsyncButton act={createGroupMutation}>Создать группу</AsyncButton>
      )}
    </section>
  );
};

export default GroupSection;

import { useCallback } from 'react';

import styled from 'styled-components';

import { A, Column, Row } from '@kocherga/frontkit';

import { usePermissions } from '~/common/hooks';
import { AsyncButton, AsyncButtonWithConfirm } from '~/components';

import {
  StaffMemberFullFragment,
  StaffMemberDocument,
  useStaffGrantGooglePermissionsToMemberMutation,
  useStaffFireMemberMutation,
} from '../queries.generated';

const Ex = styled.div`
  background-color: #ddd;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
`;

const Image = styled.img`
  width: 300px;
  height: auto;
`;

interface Props {
  member: StaffMemberFullFragment;
}

const ManagerControls: React.FC<Props> = ({ member }) => {
  const refetchConfig = {
    refetchQueries: [
      {
        query: StaffMemberDocument,
        variables: { id: member.id },
      },
    ],
    awaitRefetchQueries: true,
  };

  const [
    grantGooglePermissionsMutation,
  ] = useStaffGrantGooglePermissionsToMemberMutation(refetchConfig);
  const [fireMutation] = useStaffFireMemberMutation(refetchConfig);

  const grantGooglePermissions = useCallback(async () => {
    await grantGooglePermissionsMutation({ variables: { id: member.id } });
  }, [grantGooglePermissionsMutation, member.id]);

  const fire = useCallback(async () => {
    await fireMutation({ variables: { id: member.id } });
  }, [fireMutation, member.id]);

  if (member.role !== 'WATCHMAN') {
    return null;
  }

  if (!member.is_current) {
    return null;
  }

  return (
    <Row>
      <AsyncButton small act={grantGooglePermissions}>
        Выдать права в Google
      </AsyncButton>

      <AsyncButtonWithConfirm small act={fire} confirmText="Точно уволить?">
        Уволить
      </AsyncButtonWithConfirm>
    </Row>
  );
};

const MemberProfile: React.FC<Props> = ({ member }) => {
  const [current_user_is_manager] = usePermissions(['staff.manage']);

  return (
    <Column centered gutter={20} style={{ marginBottom: 100 }}>
      <Column centered gutter={0}>
        <h1>{member.full_name}</h1>
        <h2 style={{ color: member.color || 'black' }}>{member.short_name}</h2>
        <div>{member.user.email}</div>
        {member.is_current || <Ex>Бывший сотрудник</Ex>}
      </Column>
      <Column centered>
        {member.slack_user && <Image src={member.slack_user.image_url} />}
        {member.slack_user && (
          <A
            href={`https://kocherga.slack.com/messages/${member.slack_user.slack_id}/`}
          >
            Написать в Slack
          </A>
        )}
        {member.vk && <A href={member.vk}>Профиль VK</A>}
      </Column>
      {current_user_is_manager && (
        <Column centered>
          <ManagerControls member={member} />
        </Column>
      )}
    </Column>
  );
};

export default MemberProfile;

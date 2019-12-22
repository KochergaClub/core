import { useCallback } from 'react';

import styled from 'styled-components';

import { A, Column, Row } from '@kocherga/frontkit';

import { usePermissions } from '~/common/hooks';
import { AsyncButton, AsyncButtonWithConfirm } from '~/components';

import {
  MemberFragment,
  useStaffGrantGooglePermissionsToMemberMutation,
  useStaffFireMemberMutation,
} from '../codegen';

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
  member: MemberFragment;
}

const ManagerControls: React.FC<Props> = ({ member }) => {
  const [
    grantGooglePermissionsMutation,
  ] = useStaffGrantGooglePermissionsToMemberMutation();
  const [fireMutation] = useStaffFireMemberMutation();

  const grantGooglePermissions = useCallback(async () => {
    await grantGooglePermissionsMutation({ variables: { id: member.id } });
    // TODO - check cache invalidation
  }, [grantGooglePermissionsMutation, member.id]);

  const fire = useCallback(async () => {
    await fireMutation({ variables: { id: member.id } });
    // TODO - check cache invalidation
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
        <div>{member.email}</div>
        {member.is_current || <Ex>Бывший сотрудник</Ex>}
      </Column>
      <Column centered>
        {member.slack_image && <Image src={member.slack_image} />}
        {member.slack_id && (
          <A href={`https://kocherga.slack.com/messages/${member.slack_id}/`}>
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

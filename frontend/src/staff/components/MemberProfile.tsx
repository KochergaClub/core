import { useCallback } from 'react';
import styled from 'styled-components';

import { useMutation, useQuery } from '@apollo/client';
import { A, Column, Row } from '~/frontkit';

import { usePermissions } from '~/common/hooks';
import { ApolloQueryResults, AsyncButton, AsyncButtonWithConfirm } from '~/components';

import {
    StaffFireMemberDocument, StaffGrantGooglePermissionsToMemberDocument, StaffMemberDocument,
    StaffMemberExternalAccountsDocument, StaffMemberFullFragment, StaffUnfireMemberDocument
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

const ExternalServices: React.FC<{ member_id: string }> = ({ member_id }) => {
  const queryResults = useQuery(StaffMemberExternalAccountsDocument, {
    variables: {
      id: member_id,
    },
  });
  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { staffMember } }) => (
        <Column>
          <h2>Внешние доступы</h2>
          <small>
            Раздел в разработке, пока поддерживается только slack и wiki. Этот
            раздел виден только пользователям с правами{' '}
            <code>external_services.view_access</code>.
          </small>
          <ul>
            {staffMember.user.external_accounts.map((account, id) => (
              <li key={id}>{account.service.slug}</li>
            ))}
          </ul>
        </Column>
      )}
    </ApolloQueryResults>
  );
};

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
  ] = useMutation(StaffGrantGooglePermissionsToMemberDocument, refetchConfig);
  const [fireMutation] = useMutation(StaffFireMemberDocument, refetchConfig);
  const [unfireMutation] = useMutation(StaffUnfireMemberDocument, refetchConfig);

  const grantGooglePermissions = useCallback(async () => {
    await grantGooglePermissionsMutation({ variables: { id: member.id } });
  }, [grantGooglePermissionsMutation, member.id]);

  const fire = useCallback(async () => {
    await fireMutation({ variables: { id: member.id } });
  }, [fireMutation, member.id]);

  const unfire = useCallback(async () => {
    await unfireMutation({ variables: { id: member.id } });
  }, [unfireMutation, member.id]);

  if (member.role !== 'WATCHMAN') {
    return null;
  }

  if (!member.is_current) {
    return (
      <Row>
        <AsyncButton small act={unfire}>
          Восстановить
        </AsyncButton>
      </Row>
    );
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
  const [current_user_can_view_external_services] = usePermissions([
    'external_services.view_access',
  ]);

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
      {current_user_can_view_external_services && (
        <ExternalServices member_id={member.id} />
      )}
    </Column>
  );
};

export default MemberProfile;

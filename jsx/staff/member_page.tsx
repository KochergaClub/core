import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button, Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '../common/types';
import { useAPI } from '../common/hooks';
import Page from '../components/Page';

import { Member } from './types';

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
  member: Member;
  current_user_is_manager: boolean;
}

const ManagerControls = ({ member }: { member: Member }) => {
  const [granting, setGranting] = useState(false);
  const api = useAPI();

  if (member.role !== 'WATCHMAN') {
    return null;
  }

  const grantGoogle = useCallback(
    async () => {
      setGranting(true);
      await api.call(
        `staff/member/${member.id}/grant_google_permissions`,
        'POST'
      );
      setGranting(false);
    },
    [member]
  );

  return (
    <Button small loading={granting} disabled={granting} onClick={grantGoogle}>
      Выдать права в Google
    </Button>
  );
};

const StaffMemberPage = ({ member, current_user_is_manager }: Props) => (
  <Page title={`${member.full_name} | Профиль сотрудника`} team>
    <Column centered gutter={20} style={{ marginBottom: 100 }}>
      <Column centered gutter={0}>
        <h1>{member.full_name}</h1>
        <h2 style={{ color: member.color || 'black' }}>{member.short_name}</h2>
        {member.is_current || <Ex>Бывший сотрудник</Ex>}
      </Column>
      <Column centered>
        {member.slack_image && <Image src={member.slack_image} />}
        {member.slack_id && (
          <a href={`https://kocherga.slack.com/messages/${member.slack_id}/`}>
            Написать в Slack
          </a>
        )}
        {member.vk && <a href={member.vk}>Профиль VK</a>}
      </Column>
      {current_user_is_manager && (
        <Column centered>
          <ManagerControls member={member} />
        </Column>
      )}
    </Column>
  </Page>
);

const getInitialData: InitialLoader<Props> = async (
  { api, user },
  { params }
) => {
  const member = await api.call(`staff/member/${params.id}`, 'GET');
  return {
    member,
    current_user_is_manager: user.permissions.indexOf('staff.manage') !== -1,
  };
};

const screen: Screen<Props> = {
  component: StaffMemberPage,
  getInitialData,
};

export default screen;

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { A, Column } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { useAPI } from '~/common/hooks';
import Page from '~/components/Page';
import AsyncButton from '~/components/AsyncButton';
import { selectAPI, selectUser } from '~/core/selectors';

import { Member } from '~/staff/types';
import { getMember, grantGooglePermissions } from '~/staff/api';

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
  const api = useAPI();

  const handleGrantGooglePermissions = useCallback(async () => {
    await grantGooglePermissions(api, member.id);
  }, [api, member.id]);

  if (member.role !== 'WATCHMAN') {
    return null;
  }

  return (
    <AsyncButton small act={handleGrantGooglePermissions}>
      Выдать права в Google
    </AsyncButton>
  );
};

const StaffMemberPage: NextPage<Props> = ({
  member,
  current_user_is_manager,
}) => {
  return (
    <Page title={`${member.full_name} | Профиль сотрудника`} team>
      <Page.Main>
        <Column centered gutter={20} style={{ marginBottom: 100 }}>
          <Column centered gutter={0}>
            <h1>{member.full_name}</h1>
            <h2 style={{ color: member.color || 'black' }}>
              {member.short_name}
            </h2>
            <div>{member.email}</div>
            {member.is_current || <Ex>Бывший сотрудник</Ex>}
          </Column>
          <Column centered>
            {member.slack_image && <Image src={member.slack_image} />}
            {member.slack_id && (
              <A
                href={`https://kocherga.slack.com/messages/${member.slack_id}/`}
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
      </Page.Main>
    </Page>
  );
};

StaffMemberPage.getInitialProps = async ({ store: { getState }, query }) => {
  const api = selectAPI(getState());
  const user = selectUser(getState());

  const id = parseInt(query.id as string);
  const member = await getMember(api, id);
  return {
    member,
    current_user_is_manager: user.permissions.indexOf('staff.manage') !== -1,
  };
};

export default StaffMemberPage;

import * as React from 'react';
import styled from 'styled-components';

import Page from '../components/Page';
import { Column } from '@kocherga/frontkit';

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

interface Member {
  full_name: string;
  short_name?: string;
  color?: string;
  is_current: boolean;
  slack_image?: string;
  slack_id?: string;
  vk?: string;
}

export default ({ member }: { member: Member }) => (
  <Page title="Страница сотрудника" team>
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
    </Column>
  </Page>
);

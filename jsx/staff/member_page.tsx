import * as React from 'react';
import styled from 'styled-components';

import { Column } from '@kocherga/frontkit';

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

export default ({ member }: { member: Member }) => (
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
    </Column>
  </Page>
);

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

export default ({ member }) => (
  <Page title="Страница сотрудника" team>
    <Column centered gutter={20}>
      <Column centered gutter={0}>
        <h1>{member.full_name}</h1>
        <h2 style={{ color: member.color || 'black' }}>{member.short_name}</h2>
        {member.is_current || <Ex>Бывший сотрудник</Ex>}
      </Column>
      <Column>
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

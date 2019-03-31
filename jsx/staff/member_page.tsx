import * as React from 'react';

import Page from '../components/Page';

export default ({ member }) => (
  <Page title="Страница сотрудника" team>
    <h1>
      Страница сотрудника{' '}
      <span style={{ color: member.color || 'black' }}>
        {member.short_name}
      </span>
    </h1>
    <h2>{member.full_name}</h2>
    {member.slack_id && (
      <a href={`https://kocherga.slack.com/messages/${member.slack_id}/`}>
        Написать в slack
      </a>
    )}
    {member.vk && <a href={member.vk}>VK</a>}
  </Page>
);

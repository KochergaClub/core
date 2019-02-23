import * as React from 'react';

import Page from '../components/Page';
import TeamMenu from '../components/TeamMenu';

const Users = ({ users }) => (
  <ul>
    {
      users.map(
        user => (
          <li>
            <a href={user.telegram_link}>ссылка на бота</a>
            {' '}
            <strong>{user.user}</strong>
          </li>
        )
      )
    }
  </ul>
);

export default ({ cohort_id, users }) => (
  <Page title="Аналитика мастермайнд-дейтинга">
    <TeamMenu />
    <h1>Мастермайнд-дейтинг</h1>
    <section>
      <a href="/team/mastermind_dating">&larr; к списку когорт</a>
    </section>
    <h1>Когорта {cohort_id}</h1>
    <Users users={users} />
  </Page>
);

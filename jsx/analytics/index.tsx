import React from 'react';

import Page from '../components/Page';

const BOVStatCard = ({ bovStat }) => (
  <div>
    <h3>{bovStat.date}</h3>
    <p>Всего карт: {bovStat.count}</p>
    <p>Всего доход: {bovStat.total_income}</p>
  </div>
);

export default ({ bov_stats }) => (
  <Page title="Аналитика Кочерги" team>
    <h1>Аналитика Кочерги</h1>
    <ul>
      <li>
        <a href="https://metabase.team.kocherga.club">Metabase</a>
      </li>
      <li>
        <a href="https://wiki.team.kocherga.club/Категория:Аналитика">
          О аналитике на вики
        </a>
      </li>
    </ul>
    <h2>Большие открытые встречи</h2>
    {bov_stats.map((bovStat, i) => <BOVStatCard key={i} bovStat={bovStat} />)}
  </Page>
);

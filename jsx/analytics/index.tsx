import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';

interface BOVStatType {
  date: string;
  count: number;
  total_income: number;
}

interface Props {
  bov_stats: BOVStatType[];
}

const BOVStatCard = ({ bovStat }: { bovStat: BOVStatType }) => (
  <div>
    <h3>{bovStat.date}</h3>
    <p>Всего карт: {bovStat.count}</p>
    <p>Всего доход: {bovStat.total_income}</p>
  </div>
);

const AnalyticsPage = ({ bov_stats }: Props) => {
  return (
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
};

const getInitialData: InitialLoader<Props> = async (context, params, query) => {
  const bov_stats = await context.api.call('analytics/bov_stats', 'GET');
  return { bov_stats };
};

const screen: Screen<Props> = {
  component: AnalyticsPage,
  getInitialData,
};

export default screen;

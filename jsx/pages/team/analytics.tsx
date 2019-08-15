import React from 'react';

import { A } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { selectAPI } from '~/core/selectors';
import Page from '~/components/Page';
import ActionButton from '~/components/ActionButton';

import { fetchBovStats } from '~/analytics/api';
import { BOVStatType } from '~/analytics/types';

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

const AnalyticsPage: NextPage<Props> = ({ bov_stats }) => {
  return (
    <Page title="Аналитика Кочерги" team>
      <Page.Title>Аналитика Кочерги</Page.Title>
      <Page.Main>
        <ul>
          <li>
            <A href="https://metabase.team.kocherga.club">Metabase</A>
          </li>
          <li>
            <A href="https://wiki.team.kocherga.club/Категория:Аналитика">
              О аналитике на вики
            </A>
          </li>
        </ul>
        <section>
          <h2>Большие открытые встречи</h2>
          {bov_stats.map((bovStat, i) => (
            <BOVStatCard key={i} bovStat={bovStat} />
          ))}
        </section>
        <section>
          <h2>Facebook</h2>
          <ActionButton path="fb/marketing/audience/upload_ratio_tickets">
            Обновить аудиторию ratio_tickets
          </ActionButton>
        </section>
      </Page.Main>
    </Page>
  );
};

AnalyticsPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());
  const bov_stats = await fetchBovStats(api);
  return { bov_stats };
};

export default AnalyticsPage;

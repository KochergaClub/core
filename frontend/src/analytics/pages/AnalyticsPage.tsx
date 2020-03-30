import { A } from '@kocherga/frontkit';

import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';
import { Page, ActionButton, ApolloQueryResults } from '~/components';

import {
  useAnalyticsBovStatsQuery,
  AnalyticsBovStatFragment,
} from '../queries.generated';

interface Props {
  bov_stats: AnalyticsBovStatFragment[];
}

const BOVStatCard = ({ bovStat }: { bovStat: AnalyticsBovStatFragment }) => (
  <div>
    <h3>{bovStat.date}</h3>
    <p>Всего карт: {bovStat.count}</p>
    <p>Всего доход: {bovStat.total_income}</p>
  </div>
);

const AnalyticsPage: NextPage<Props> = () => {
  const queryResults = useAnalyticsBovStatsQuery();

  return (
    <Page title="Аналитика Кочерги" menu="team">
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
          <ApolloQueryResults {...queryResults} size="block">
            {({ data: { bovStats } }) => (
              <div>
                {bovStats.map((bovStat, i) => (
                  <BOVStatCard key={i} bovStat={bovStat} />
                ))}
              </div>
            )}
          </ApolloQueryResults>
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

export default withApollo(AnalyticsPage);

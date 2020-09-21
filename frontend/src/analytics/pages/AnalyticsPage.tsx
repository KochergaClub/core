import { useMutation, useQuery } from '@apollo/client';
import { A } from '@kocherga/frontkit';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { ApolloQueryResults, AsyncButton, Page } from '~/components';

import {
    AnalyticsBovStatFragment, AnalyticsBovStatsDocument, AnalyticsUpdateFbRatioAudienceDocument
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

const AnalyticsPage: NextApolloPage<Props> = () => {
  const queryResults = useQuery(AnalyticsBovStatsDocument);

  const [updateFbRatioTickets] = useMutation(
    AnalyticsUpdateFbRatioAudienceDocument
  );

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
          <AsyncButton act={updateFbRatioTickets}>
            Обновить аудиторию ratio_tickets
          </AsyncButton>
        </section>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(AnalyticsPage));

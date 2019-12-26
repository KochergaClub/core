import { NextPage } from '~/common/types';
import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import { Page, ApolloQueryResults } from '~/components';

import { useRatioTrainingWithScheduleQuery } from '~/ratio/queries.generated';

import SchedulePage from '~/ratio/schedule';

interface Props {
  slug: string;
}

const RatioSchedulePage: NextPage<Props> = ({ slug }) => {
  const queryResults = useRatioTrainingWithScheduleQuery();

  return (
    <Page
      title={
        queryResults.data
          ? `Расписание | ${queryResults.data.training.name}`
          : 'Загружается...'
      }
      team
    >
      <Page.Main>
        <ApolloQueryResults {...queryResults}>
          {({ data: { training } }) => <SchedulePage training={training} />}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

RatioSchedulePage.getInitialProps = async ({ query }) => {
  const slug = query.slug as string;

  return {
    slug,
  };
};

export default withApollo(withStaff(RatioSchedulePage));

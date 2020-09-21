import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { ApolloQueryResults, Page } from '~/components';
import { RatioTrainingWithScheduleDocument } from '~/ratio/queries.generated';
import SchedulePage from '~/ratio/schedule';

interface Props {
  slug: string;
}

const RatioSchedulePage: NextApolloPage<Props> = ({ slug }) => {
  const queryResults = useQuery(RatioTrainingWithScheduleDocument, {
    variables: { slug },
  });

  return (
    <Page
      title={
        queryResults.data
          ? `Расписание | ${queryResults.data.training.name}`
          : 'Загружается...'
      }
      menu="team"
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

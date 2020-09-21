import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { ApolloQueryResults, Page } from '~/components';

import Controls from '../components/Controls';
import GroupSection from '../components/GroupSection';
import ParticipantSection from '../components/ParticipantSection';
import { MastermindDatingCohortByIdDocument } from '../queries.generated';

interface Props {
  cohort_id: string;
}

const MastermindCohortPage: NextApolloPage<Props> = props => {
  const queryResults = useQuery(MastermindDatingCohortByIdDocument, {
    variables: {
      id: props.cohort_id,
    },
  });

  return (
    <Page
      title={`Когорта ${props.cohort_id} | Мастермайнд-дейтинг`}
      menu="team"
    >
      <Page.Title>Мастермайнд-дейтинг. Когорта {props.cohort_id}</Page.Title>
      <Page.Main>
        <ApolloQueryResults {...queryResults}>
          {({ data: { cohort } }) => (
            <div>
              <Controls cohort={cohort} />
              <ParticipantSection cohort={cohort} />
              <GroupSection cohort={cohort} />
            </div>
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

MastermindCohortPage.getInitialProps = async ({ query }) => {
  const cohort_id = parseInt(query.id as string, 10);

  return {
    cohort_id: String(cohort_id),
  };
};

export default withApollo(withStaff(MastermindCohortPage));

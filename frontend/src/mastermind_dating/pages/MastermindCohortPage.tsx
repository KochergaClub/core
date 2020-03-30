import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';
import { Page, ApolloQueryResults } from '~/components';

import Controls from '../components/Controls';
import ParticipantSection from '../components/ParticipantSection';
import GroupSection from '../components/GroupSection';

import { useMastermindDatingCohortByIdQuery } from '../queries.generated';

interface Props {
  cohort_id: string;
}

const MastermindCohortPage: NextPage<Props> = props => {
  const queryResults = useMastermindDatingCohortByIdQuery({
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

export default withApollo(MastermindCohortPage);

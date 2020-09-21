import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { ApolloQueryResults, Page } from '~/components';
import MemberProfile from '~/staff/components/MemberProfile';

import { StaffMemberDocument } from '../queries.generated';

interface Props {
  id: string;
}

const StaffMemberPage: NextApolloPage<Props> = ({ id }) => {
  const queryResults = useQuery(StaffMemberDocument, { variables: { id } });

  const title = queryResults.loading
    ? '(Загружается) | Профиль сотрудника'
    : queryResults.data
    ? `${queryResults.data.staffMember.full_name} | Профиль сотрудника`
    : '(Ошибка) | Профиль сотрудника';

  return (
    <Page title={title} menu="team">
      <Page.Main>
        <ApolloQueryResults {...queryResults}>
          {({ data: { staffMember } }) => (
            <MemberProfile member={staffMember} />
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

StaffMemberPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  return { id };
};

export default withApollo(withStaff(StaffMemberPage));

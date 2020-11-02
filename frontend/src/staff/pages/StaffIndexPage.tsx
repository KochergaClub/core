import Link from 'next/link';

import { useQuery } from '@apollo/client';
import { A, Column } from '~/frontkit';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { ApolloQueryResults, Page } from '~/components';

import { StaffMemberForListFragment, StaffMembersDocument } from '../queries.generated';

const MemberList = ({
  title,
  members,
}: {
  title: string;
  members: StaffMemberForListFragment[];
}) => (
  <Column centered>
    <h2>{title}</h2>
    {members.map(member => (
      <Link
        href="/team/staff/[id]"
        as={`/team/staff/${member.id}`}
        key={member.id}
        passHref
      >
        <A>{member.full_name}</A>
      </Link>
    ))}
  </Column>
);

const StaffIndexPage: NextApolloPage = () => {
  const queryResults = useQuery(StaffMembersDocument);

  return (
    <Page title="Список сотрудников" menu="team">
      <Page.Main>
        <ApolloQueryResults {...queryResults}>
          {({ data: { staffMembersAll: members } }) => (
            <Column centered gutter={20}>
              <h1>Список сотрудников</h1>
              <MemberList
                title="Менеджеры"
                members={members.filter(
                  m => m.is_current && ['FOUNDER', 'MANAGER'].includes(m.role)
                )}
              />
              <MemberList
                title="Рацио"
                members={members.filter(
                  m => m.is_current && ['TRAINER'].includes(m.role)
                )}
              />
              <MemberList
                title="Админы"
                members={members.filter(
                  m => m.is_current && ['WATCHMAN'].includes(m.role)
                )}
              />
              <MemberList
                title="Прочие"
                members={members.filter(
                  m =>
                    m.is_current &&
                    !['WATCHMAN', 'FOUNDER', 'MANAGER', 'TRAINER'].includes(
                      m.role
                    )
                )}
              />
              <MemberList
                title="Бывшие сотрудники"
                members={members.filter(m => !m.is_current)}
              />
            </Column>
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(StaffIndexPage));
